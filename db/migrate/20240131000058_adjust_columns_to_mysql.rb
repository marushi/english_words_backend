class AdjustColumnsToMysql < ActiveRecord::Migration[7.1]
  def change
    # change_column :english_words, :created_at, :datetime, null: false, default: "CURRENT_TIMESTAMP"
    # change_column :english_words, :updated_at, :datetime, null: false, default: { '(CURRENT_DATE)' }
    # change_column :english_words, :example_sentence, :json, null: false

    # change_column :users, :created_at, :datetime, null: false, default: { '(CURRENT_DATE)' }
    # change_column :users, :updated_at, :datetime, null: false, default: -> { '(CURRENT_DATE)' }
    # add_column :id, :primary_key, :bigint, auto_increment: true
  end
end
