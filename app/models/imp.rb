class Imp < ActiveRecord::Base
  validates :name, :email, :calendar, presence: { message: "ist erforderlich" }
  validates :email, uniqueness: { message: "ist schon angemeldet" }
end
