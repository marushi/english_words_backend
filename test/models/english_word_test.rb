# == Schema Information
#
# Table name: english_words
#
#  id         :integer          not null, primary key
#  learned_at :datetime
#  word       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class EnglishWordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
