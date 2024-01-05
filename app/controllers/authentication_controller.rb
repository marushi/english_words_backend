class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def index; end

  def sign_in
    client = Aws::CognitoIdentityProvider::Client.new
    resp = client.list_identity_providers({
                                            user_pool_id: ENV['AWS_COGNITO_POOL_ID']
                                          })

    redirect_to redirect_uri, allow_other_host: true
  end

  private

  def redirect_uri
    domain = ENV['AWS_COGNITO_DOMAIN']
    client_id = ENV['AWS_COGNITO_APP_CLIENT_ID']
    redirect_uri = ENV['AWS_COGNITO_REDIRECT_URI']

    "#{domain}/login?response_type=code&client_id=#{client_id}&redirect_uri=#{redirect_uri}"
  end
end
