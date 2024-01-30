class SessionController < ApplicationController
  include AuthenticationHelper

  skip_before_action :authenticate_request, only: [:cognito_callback]

  def cognito_callback
    oauth2_token_response = exchange_authorization_code_for_tokens(params[:code])
    store_tokens!(oauth2_token_response)
  ensure
    redirect_to root_path
  end

  def cognito_logout_callback
    session[:cognito_uuid] = nil
    redirect_to root_path
  end

  private

  def exchange_authorization_code_for_tokens(authorization_code)
    uri = "#{ENV.fetch('AWS_COGNITO_DOMAIN', nil)}/oauth2/token"

    faraday_connection = Faraday.new(url: uri) do |faraday|
      faraday.request :url_encoded
      faraday.adapter Faraday.default_adapter
    end

    redirect_uri = create_redirect_uri(ENV.fetch('AWS_COGNITO_REDIRECT_URI', nil))

    faraday_connection.post do |req|
      req.params['grant_type'] = 'authorization_code'
      req.params['client_id'] = ENV.fetch('AWS_COGNITO_APP_CLIENT_ID', nil)
      req.params['client_secret'] = ENV.fetch('AWS_COGNITO_APP_CLIENT_SECRET', nil)
      req.params['redirect_uri'] = redirect_uri
      req.params['code'] = authorization_code
      req.params['scope'] = 'aws.cognito.signin.user.admin'
    end
  end
end
