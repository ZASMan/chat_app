class MessagesController < ApplicationController
  before_action :set_chat_room, only: %i[ show edit update destroy ]

  # GET /messages or /messages.json
  def index
    @messages = ChatRoom.all
  end

  # GET /messages/1 or /messages/1.json
  def show
  end

  # GET /messages/new
  def new
    @chat_room = ChatRoom.new
  end

  # POST /messages or /messages.json
  def create
    @chat_room = ChatRoom.new(chat_room_params)

    respond_to do |format|
      if @chat_room.save
        format.html { redirect_to @chat_room, notice: "Chat room was successfully created." }
        format.json { render :show, status: :created, location: @chat_room }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @chat_room.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1 or /messages/1.json
  def destroy
    @chat_room.destroy
    respond_to do |format|
      format.html { redirect_to messages_url, notice: "Chat room was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat_room
      @chat_room = ChatRoom.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def chat_room_params
      params.require(:chat_room).permit(:user_id)
    end
end
