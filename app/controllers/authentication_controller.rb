class AuthenticationController < ApplicationController
  include AuthenticationHelper

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
    redirect_uri = create_redirect_uri(ENV.fetch('AWS_COGNITO_REDIRECT_URI', nil))

    "#{domain}/oauth2/authorize?response_type=code&client_id=#{client_id}&redirect_uri=#{redirect_uri}"
  end

  def logout_uri
    domain = ENV.fetch('AWS_COGNITO_DOMAIN', nil)
    client_id = ENV.fetch('AWS_COGNITO_APP_CLIENT_ID', nil)
    redirect_uri = create_redirect_uri(ENV.fetch('AWS_COGNITO_SIGNOUT_URI', nil))

    "#{domain}/logout?client_id=#{client_id}&logout_uri=#{redirect_uri}"
  end
end
