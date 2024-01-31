class AddColumnOnUsersTable < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :refresh_token, :string, limit: 2048
    add_column :users, :expires_in, :integer
    add_column :users, :authorized_at, :datetime, null: false
  end
end
