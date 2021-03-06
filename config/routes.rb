Rails.application.routes.draw do
  devise_for :factories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :factories do 
    member do 
      post :login
      post :reset
      post :email
    end
  end

  resources :orders

  root to: 'orders#index'
end
