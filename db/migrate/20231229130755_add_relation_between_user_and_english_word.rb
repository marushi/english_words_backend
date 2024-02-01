class AddRelationBetweenUserAndEnglishWord < ActiveRecord::Migration[7.1]
  def change
    add_column :english_words, :user_id, :bigint, null: false
  end
end
