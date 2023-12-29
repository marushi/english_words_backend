class CreateEnglishWords < ActiveRecord::Migration[7.1]
  def change
    create_table :english_words do |t|
      t.string :word, null: false
      t.datetime :learned_at, null: true
      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }, null: false
    end
  end
end