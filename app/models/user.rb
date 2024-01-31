class User < ApplicationRecord
  class AccessTokenExpiredError < StandardError; end

  has_many :english_words, dependent: :destroy

  def verify_access_expiration!
    raise AccessTokenExpiredError if authorized_at + expires_in.seconds < Time.zone.now
  end
end

# == Schema Information
#
# Table name: users
#
#  id            :bigint           not null, primary key
#  authorized_at :datetime         not null
#  cognito_uuid  :string(255)      not null
#  expires_in    :integer
#  refresh_token :string(2048)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
