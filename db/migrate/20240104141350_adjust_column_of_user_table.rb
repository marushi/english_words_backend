class AdjustColumnOfUserTable < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :auth_provider
    remove_column :users, :uid

    add_column :users, :cognito_uuid, :string, null: false
  end
end
