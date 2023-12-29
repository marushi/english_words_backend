class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :uid, null: false
      t.string :auth_provider, null: false
      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }, null: false
    end
  end
end
