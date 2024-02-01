class EnglishWord < ApplicationRecord
  belongs_to :user
end

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
#  user_id                :bigint           not null
#
