require 'rails_helper'

RSpec.describe "Welcomes", type: :request do
  describe "GET /" do
    it "returns http success" do
      sign_in create(:user)
      get "/"
      expect(response).to have_http_status(:success)
    end
  end

end
