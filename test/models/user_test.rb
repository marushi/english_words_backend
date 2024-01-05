# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  authorized_at :datetime         not null
#  cognito_uuid  :string           not null
#  expires_in    :integer
#  refresh_token :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
