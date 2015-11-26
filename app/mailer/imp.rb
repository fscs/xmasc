class ImpMailer < ActionMailer::Base
  default subject: "Weihnachtskalender FSCS #{Date.today.strftime("%Y")}",
    from: "fscs@uni-duesseldorf.de"

  def welcome(name, email)
    @imp = name
    mail(to: email) { |format| format.html }
  end

  def tuerchen(name, email, calendar, tuerchen)
    @imp = name
    @calendar = calendar
    @tuerchen = tuerchen
    mail(to: email) { |format| format.html }
  end
end
