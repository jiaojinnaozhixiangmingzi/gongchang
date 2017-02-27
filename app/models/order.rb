class Order < ApplicationRecord
  belongs_to :category
  belongs_to :user
  belongs_to :address
  
  has_many :items
  has_many :product_items
end
