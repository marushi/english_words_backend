# == Schema Information
#
# Table name: english_words
#
#  id         :integer          not null, primary key
#  learned_at :datetime
#  word       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Indexes
#
#  index_english_words_on_user_id  (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
require 'test_helper'

class EnglishWordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
