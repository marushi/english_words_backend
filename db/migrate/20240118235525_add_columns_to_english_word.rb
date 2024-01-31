class AddColumnsToEnglishWord < ActiveRecord::Migration[7.1]
  def change
    add_column :english_words, :word_japanese, :string, null: false, default: ''
    add_column :english_words, :phonetic_symbol, :string, null: false, default: ''
    add_column :english_words, :example_sentence, :json, null: false
    add_column :english_words, :synonym, :string, null: false, default: ''
    add_column :english_words, :synonym_japanese, :string, null: false, default: ''
  end
end
