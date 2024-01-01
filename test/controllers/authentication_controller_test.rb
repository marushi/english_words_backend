# frozen_string_literal: true

require 'test_helper'

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test 'should get sign_in' do
    get authentication_sign_in_url
    assert_response :success
  end
end
