class SessionController < ApplicationController
  skip_before_action :authenticate_request, only: [:cognito_callback]

  def cognito_callback
    oauth2_token_response = exchange_authorization_code_for_tokens(params[:code])
    store_tokens!(oauth2_token_response)
  ensure
    redirect_to root_path
  end

  private

  def exchange_authorization_code_for_tokens(authorization_code)
    uri = ENV['AWS_COGNITO_DOMAIN'] + '/oauth2/token'

    faraday_connection = Faraday.new(url: uri) do |faraday|
      faraday.request :url_encoded
      faraday.adapter Faraday.default_adapter
    end

    faraday_connection.post do |req|
      req.params['grant_type'] = 'authorization_code'
      req.params['client_id'] = ENV['AWS_COGNITO_APP_CLIENT_ID']
      req.params['client_secret'] = ENV['AWS_COGNITO_APP_CLIENT_SECRET']
      req.params['redirect_uri'] = ENV['AWS_COGNITO_REDIRECT_URI']
      req.params['code'] = authorization_code
      req.params['scope'] = 'aws.cognito.signin.user.admin'
    end
  end
end
