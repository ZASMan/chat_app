Rails.application.routes.draw do
  resources :chat_rooms do
    resources :messages
  end
  devise_for :users

  root to: 'welcome#index'
end
