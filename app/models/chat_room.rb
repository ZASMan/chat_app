class ChatRoom < ApplicationRecord
  has_many :messages
  belongs_to :creator, class_name: "User", foreign_key: "user_id"
  belongs_to :recipient, class_name: "User", foreign_key: "recipient_id"

end
