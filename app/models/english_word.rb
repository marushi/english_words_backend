class EnglishWord < ApplicationRecord
  belongs_to :user
end

# == Schema Information
#
# Table name: english_words
#
#  id               :integer          not null, primary key
#  example_sentence :json             not null
#  learned_at       :datetime
#  phonetic_symbol  :string           default(""), not null
#  synonym          :string           default(""), not null
#  synonym_japanese :string           default(""), not null
#  word             :string           not null
#  word_japanese    :string           default(""), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer
#
# Indexes
#
#  index_english_words_on_user_id  (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
