class AddDescriptionColumnToEnglishWord < ActiveRecord::Migration[7.1]
  def change
    add_column :english_words, :description_and_origin, :string, null: false, default: ''
  end
end
