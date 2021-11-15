class AddRecipientIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :recipient_id, :integer
  end
end
