FactoryBot.define do
  factory :user do
    name { 'Test User' }
    email { 'testuser@welcome.tech' }
    password { 'mypassword' }
  end
end
