class Imp < ActiveRecord::Base
  validates :name, :email, presence: { message: "ist erforderlich" }
  validates :email, uniqueness: { message: "ist schon angemeldet" }
  validates :tuerchen, uniqueness: { scope: "calendar", allow_nil: true }
  validate :rest_of_calendar, on: :create

  def rest_of_calendar
    if !calendar.nil? and self.class.where(calendar: calendar).length >= 24
      errors.add :calendar, "ist schon ausgebucht!"
    end

    if self.class.count >= 72
      errors.add :calendar, "in beiden Kalendern sind alle Türchen vergeben"
    end
  end
end
