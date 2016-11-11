# XMASC

Ein Tool um Namen und E-Mail-Adressen und einen Kalendernamen in einer Datenbank zu speichern.

## Würfeln

Für das Würfeln und Benachrichtigen der Wichtel gibt es zwei Rake-Tasks `xmasc:roll` und `xmasc:mail`. Der Workflow ist, dass man sobald alle Türchen vergeben sind auswürfelt wer welches Türchen erhält und danach alle Wichtel per mail benachrichtigt.

### `bundle exec rake xmasc:roll`

Dieser Task verteilt auf jeden Wichtel zufällig ein Türchen. Zuerst werden auf alle Wichtel, die sich einen Kalender ausgesucht haben zufällig Türchen verteilt. Aus der Menge der übrig gebliebenen Türchen werden dann im zweiten Schritt allen Wichteln denen der Kalender egal ist, ein Türchen zugeteilt.

### `bundle exec rake xmasc:mail`

Alle Wichtel werden über die eingetragene E-Mail-Adresse über das gewürfelte Türchen benachrichtigt. Im development mode werden alle Mails im Ordner `tmp/mails` gespeichert.

#### SMTP-Konfiguration

Die Mails werden per SMTP verschickt. Die Daten müssen als Environment-Variablen gesetzt sein. Siehe die Datei `.env.example`. Es müssen 3 Variablen gesetzt sein:

* `XMASC_SMTP_HOST` die Adresse des SMTP-Servers
* `XMASC_SMTP_USERNAME` der Login-Name
* `XMASC_SMTP_PASSWORD` das Passwort

_Hinweis_: die Daten müssen sowohl vor dem Start des Servers als auch vor dem Benutzen des Rake-Tasks zum Mails versenden gesetzt sein. Da dies höchstwahrscheinlich in zwei verschiedenen Shells geschieht muss man daran denken vor `bundle exec rake xmasc:mail` einmail `source .env` auszuführen (vorausgesetzt man hat die Environment-Variablen in `.env` gesetzt)

## Entwickeln

### Benötigte Tools

* rubygems
* bundler
  * `gem install bundler`
* nodejs
* npm
* bower
  * `npm install -g bower`

### Setup

```sh
git clone git@github.com:ohcibi/xmasc.git
cd xmasc.git
bundle install
#....
cd public
npm install
bower install
```

### Server

Der Server ist im Hauptverzeichnis und wird mit

```sh
bundle exec ruby app.rb
```

gestartet. Der lauscht dann per default auf http://localhost:4567

### Frontend

Das Frontend wird mit ember-cli welches über das Setup oben installiert wird gebaut. ember-cli
befindet sich standardmäßig in `public/node_modules/ember-cli` und der Befehl `ember` dann in
`bin/`. Man kann entweder daraus den `ember`-Befehl benutzen oder einfach `bundle exec rake build` oder `bundle exec rake` was ein
`ember build --watch` macht. Im watch-Modus kann man dann einfach entwickeln und es wird alles
automatisch kompiliert.
