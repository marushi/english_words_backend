class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, only: [:authenticate_with_google]

  def authenticate_with_google
    google_id_token = params[:google_id_token]
    aws_client_id = ENV['AWS_COGNITO_APP_CLIENT_ID']
    client = Aws::CognitoIdentityProvider::Client.new

    begin
      resp = client.initiate_auth({
                                    auth_flow: 'ADMIN_NO_SRP_AUTH',
                                    client_id: ENV['AWS_COGNITO_APP_CLIENT_ID'],
                                    auth_parameters: {
                                      'USERNAME': google_id_token,
                                      'SECRET_HASH': compute_secret_hash(ENV['AWS_COGNITO_APP_CLIENT_ID'],
                                                                         google_id_token)
                                    }
                                  })
      render json: { authentication_result: resp.authentication_result }, status: :ok
    rescue Aws::CognitoIdentityProvider::Errors::ServiceError => e
      render json: { error: e.message }, status: :unauthorized
    end
  end

  private

  def compute_secret_hash(client_id, token)
    digest = OpenSSL::Digest.new('sha256')
    hmac = OpenSSL::HMAC.digest(digest, 'CLIENT_SECRET', token + client_id)
    Base64.encode64(hmac).strip
  end
end
