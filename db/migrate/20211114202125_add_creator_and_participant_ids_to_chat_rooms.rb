class AddCreatorAndParticipantIdsToChatRooms < ActiveRecord::Migration[6.1]
  def change
    add_column :chat_rooms, :creator_id, :integer
    add_column :chat_rooms, :participant_ids, :string, array: true, default: []
  end
end
