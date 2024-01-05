module AuthenticationHelper
  class CognitoTokensMissingError < StandardError; end

  def faraday_connection
    uri = ENV['AWS_COGNITO_DOMAIN'] + '/oauth2/token'
    client = Aws::CognitoIdentityProvider::Client.new

    Faraday.new(url: uri) do |faraday|
      faraday.request :url_encoded
      faraday.adapter Faraday.default_adapter
    end
  end

  def store_tokens!(oauth2_token_response)
    response_hash = JSON.parse(oauth2_token_response.body)
    access_token = response_hash['access_token']
    refresh_token = response_hash['refresh_token']
    expires_in = response_hash['expires_in']

    raise CognitoTokensMissingError unless access_token && expires_in

    cognito_uuid = fetch_cognito_uuid(access_token)
    session[:cognito_uuid] = cognito_uuid
    create_or_update_user(cognito_uuid:, expires_in:, refresh_token:)
  end

  def fetch_cognito_uuid(access_token)
    client = Aws::CognitoIdentityProvider::Client.new
    resp = client.get_user({
                             access_token:
                           })

    resp.user_attributes.each do |attribute|
      return attribute.value if attribute.name == 'sub'
    end
  end

  def create_or_update_user(cognito_uuid:, expires_in:, refresh_token: nil)
    user = User.find_or_initialize_by(cognito_uuid:)
    update_params = {
      expires_in:,
      authorized_at: Time.now
    }

    update_params[:refresh_token] = refresh_token unless refresh_token.nil?

    user.update(update_params)
  end
end
