class AddRelationBetweenUserAndEnglishWord < ActiveRecord::Migration[7.1]
  def change
    add_reference :english_words, :user, foreign_key: true
  end
end
