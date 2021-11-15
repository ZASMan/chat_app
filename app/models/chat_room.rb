class ChatRoom < ApplicationRecord
  belongs_to :user
  has_many :messages
  belongs_to :creator, class_name: "User", foreign_key: "user_id"

end
