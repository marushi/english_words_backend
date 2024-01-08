class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def index; end

  def sign_in
    redirect_to redirect_uri, allow_other_host: true
  end

  private

  def redirect_uri
    domain = ENV.fetch('AWS_COGNITO_DOMAIN', nil)
    client_id = ENV.fetch('AWS_COGNITO_APP_CLIENT_ID', nil)
    redirect_uri = ENV.fetch('AWS_COGNITO_REDIRECT_URI', nil)

    "#{domain}/login?response_type=code&client_id=#{client_id}&redirect_uri=#{redirect_uri}"
  end
end
