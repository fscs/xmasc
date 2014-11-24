class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || "is not an email")
    end
  end
end

class Imp < ActiveRecord::Base
  validates :name, :email, :calendar, presence: { message: "ist erforderlich" }
  validates :email, uniqueness: { message: "ist schon angemeldet" }, email: { message: "ist nicht gültig" }
end
