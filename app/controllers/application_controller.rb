class ApplicationController < ActionController::API
  include AuthenticationHelper

  before_action :authenticate_request
  helper_method :current_user

  private

  def authenticate_request
    cognito_uuid = session[:cognito_uuid]
    @current_user = User.find_by(cognito_uuid:)
    @current_user.verify_access_expiration!
  rescue User::AccessTokenExpiredError
    begin
      authorize_with_refresh_token!
    rescue CognitoTokensMissingError
      redirect_to authentication_path
    end
  rescue ActiveRecord::RecordNotFound
    redirect_to authentication_path
  end

  def authorize_with_refresh_token!
    oauth2_token_response = faraday_connection.post do |req|
      req.params['grant_type'] = 'refresh_token'
      req.params['client_id'] = ENV.fetch('AWS_COGNITO_APP_CLIENT_ID', nil)
      req.params['client_secret'] = ENV.fetch('AWS_COGNITO_APP_CLIENT_SECRET', nil)
      req.params['refresh_token'] = @current_user.refresh_token
      req.params['scope'] = 'aws.cognito.signin.user.admin'
    end

    store_tokens!(oauth2_token_response)
  end

  attr_reader :current_user
end
