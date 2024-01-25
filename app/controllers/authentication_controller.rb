class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, only: %i[index sign_in]

  def index; end

  def sign_in
    redirect_to redirect_uri, allow_other_host: true
  end

  def sign_out
    redirect_to logout_uri, allow_other_host: true
  end

  private

  def redirect_uri
    domain = ENV.fetch('AWS_COGNITO_DOMAIN', nil)
    client_id = ENV.fetch('AWS_COGNITO_APP_CLIENT_ID', nil)
    redirect_uri = ENV.fetch('AWS_COGNITO_REDIRECT_URI', nil)

    "#{domain}/login?response_type=code&client_id=#{client_id}&redirect_uri=#{redirect_uri}"
  end

  def logout_uri
    domain = ENV.fetch('AWS_COGNITO_DOMAIN', nil)
    client_id = ENV.fetch('AWS_COGNITO_APP_CLIENT_ID', nil)
    redirect_uri = 'http://localhost:53000/session/cognito_logout_callback'

    "#{domain}/logout?client_id=#{client_id}&logout_uri=#{redirect_uri}"
  end
end
