# == Route Map
#

Rails.application.routes.draw do
  get 'home/index'
  post 'authentication/authenticate_with_google'
  root 'home#index'
end
