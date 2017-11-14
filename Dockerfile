FROM ruby:2.4
RUN apt-get update
RUN groupadd -r app && useradd -r -d /app -g app app

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install

COPY . /app
RUN chown -R app:app /app
USER app

WORKDIR /app

VOLUME var

CMD RACK_ENV=production rake db:migrate && bundle exec puma -C puma.rb
EXPOSE 9292
