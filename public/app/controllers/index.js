import Ember from "ember";

function getRestTime() {
 return new Date(2016, 11, 1) - new Date();
}

const {
  floor
} = Math;

const {
  computed,
  on
} = Ember;

const dayMilis = 864e5;
const hourMilis = 36e5;
const minuteMilis = 6e4;
const secondMilis = 1e3;

function getTimeFrom(time) {
  let days = floor(time / dayMilis);
  let hours = floor((time % dayMilis) / hourMilis);
  let minutes = floor((time % hourMilis) / minuteMilis);
  let seconds = floor((time % minuteMilis) / secondMilis);

  return `Noch ${days} Tage ${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`;
}


export default Ember.Controller.extend({
  time: getRestTime(),

  displayTime: computed("time", function() {
    const time = this.get("time");

    if (time > 0) {
      return getTimeFrom(time);
    }

    return "Frohe Weihnachten! · Merry Christmas! <br> Chanukah Sameach! · Heri Za Kwanzaa!";
  }),

  startTimer: on("init", function() {
    setInterval(() => this.set("time", getRestTime()), 1000);
  })
});
