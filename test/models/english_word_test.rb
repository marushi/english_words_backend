# frozen_string_literal: true

# == Schema Information
#
# Table name: english_words
#
#  id                     :bigint           not null, primary key
#  description_and_origin :string(255)      default(""), not null
#  example_sentence       :json             not null
#  learned_at             :datetime
#  phonetic_symbol        :string(255)      default(""), not null
#  synonym                :string(255)      default(""), not null
#  synonym_japanese       :string(255)      default(""), not null
#  word                   :string(255)      not null
#  word_japanese          :string(255)      default(""), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  user_id                :bigint
#
# Indexes
#
#  index_english_words_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'test_helper'

class EnglishWordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
