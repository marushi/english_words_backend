class User < ApplicationRecord
  has_many :english_words, dependent: :destroy
end

# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  auth_provider :string           not null
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
