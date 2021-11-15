class MessagesController < ApplicationController

  # GET /messages/new
  def new
    binding.irb
  end

  # POST /messages or /messages.json
  def create
    # TODO: Refactor this with strong params and multiple responses and all that
    message_params = params.permit!
    @chat_room = ChatRoom.find(message_params[:chat_room_id])
    @message = @chat_room.messages.build(
      content: message_params[:message][:content],
      sender_id: message_params[:message][:sender_id],
      recipient_id: message_params[:message][:recipient_id]
    )
    binding.irb
    if @message.save
      format.js { render js: "window.location = '#{chat_room_path(@chat_room)}'"}
    end
  end
end
