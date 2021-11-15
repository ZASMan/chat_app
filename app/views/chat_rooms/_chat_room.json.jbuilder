json.extract! chat_room, :id, :user_id, :participant_ids, :created_at, :updated_at, :messages
json.url chat_room_url(chat_room, format: :json)
