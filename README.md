# XMASC

Ein Tool um Namen und E-Mail-Adressen und einen Kalendernamen in einer Datenbank zu speichern.

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
