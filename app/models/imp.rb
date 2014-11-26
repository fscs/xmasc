class Imp < ActiveRecord::Base
  validates :name, :email, presence: { message: "ist erforderlich" }
  validates :email, uniqueness: { message: "ist schon angemeldet" }
  validate :rest_of_calendar

  def rest_of_calendar
    if self.class.where(calendar: calendar).length >= 24
      errors.add :calendar, "ist schon ausgebucht!"
    end
  end
end
