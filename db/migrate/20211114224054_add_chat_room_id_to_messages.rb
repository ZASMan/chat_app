class AddChatRoomIdToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :chat_room_id, :integer
  end
end
