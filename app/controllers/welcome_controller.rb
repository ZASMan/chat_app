class WelcomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @created_by_chat_rooms = ChatRoom.where(user_id: current_user.id).to_json
    # TODO: Convert to ActiveRecord query
    @participant_chat_rooms = ChatRoom.select { |room| room.participant_ids.present? && room.participant_ids.include?(current_user.id.to_s) }.to_json
  end
end
