class Message < ApplicationRecord
  belongs_to :chat_room, class_name: "ChatRoom", foreign_key: "chat_room_id"
  belongs_to :recipient, class_name: "User", foreign_key: "recipient_id"

  belongs_to :recipient, class_name: "User", foreign_key: "recipient_id"
  belongs_to :sender, class_name: "User", foreign_key: "sender_id"
  scope :unread, -> { where(read: false) }
  # Require content
  validates :content, presence: true
end