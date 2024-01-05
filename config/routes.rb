# == Route Map
#

Rails.application.routes.draw do
  root 'home#index'

  get 'authentication', to: 'authentication#index'
  get 'authentication/sign_in'

  get 'session/cognito_callback'
end
