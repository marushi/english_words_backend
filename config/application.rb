require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    config.secret_key_base = 'your_secure_secret_key'

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, key: '_english_words', httponly: true,
                                                                secure: Rails.env.production?, expire_after: 30.days

    config.api_only = true
    config.load_defaults 7.1
    config.autoload_lib(ignore: %w[assets tasks])
  end
end
