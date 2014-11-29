`import Ember from 'ember'`

getRestTime = -> new Date(2014, 11, 1) - new Date()

floor = Math.floor

dayMilis = 864e5
hourMilis = 36e5
minuteMilis = 6e4
secondMilis = 1e3

IndexController = Ember.ObjectController.extend
  time: getRestTime()

  displayTime: (->
    time = @get "time"
    days = floor time / dayMilis
    hours = floor (time % dayMilis) / hourMilis
    minutes = floor (time % hourMilis) / minuteMilis
    seconds = floor (time % minuteMilis) / secondMilis

    "#{days} Tage #{hours} Stunden #{minutes} Minuten #{seconds} Sekunden"
  ).property "time"

  startTimer: (-> setInterval (=> @set "time", getRestTime()), 1000).on "init"


`export default IndexController`
