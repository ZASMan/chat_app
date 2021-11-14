require 'rails_helper'

RSpec.describe "chat_rooms/index", type: :view do
  before(:each) do
    assign(:chat_rooms, [
      ChatRoom.create!(
        user: nil
      ),
      ChatRoom.create!(
        user: nil
      )
    ])
  end

  it "renders a list of chat_rooms" do
    render
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
