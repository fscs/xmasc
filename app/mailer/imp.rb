class ImpMailer < ActionMailer::Base
  default subject: "Weihnachtskalender FSCS 2014",
    from: "fscs@uni-duesseldorf.de"

  def welcome(name, email)
    @imp = name
    mail(to: email) { |format| format.html }
  end
end
