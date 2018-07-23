FROM ruby:2.5-alpine

RUN apk add --no-cache --update build-base sqlite-dev

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install

FROM node:4-alpine

COPY public /code
WORKDIR /code

RUN apk add --update --no-cache \
      build-base \
      git \
      python && \
  npm install -g bower && \
  npm install && \
  bower --allow-root install && \
  npm run-script build-production

# final app
FROM ruby:2.5-alpine

RUN apk add --no-cache --update sqlite-dev

COPY . /app
WORKDIR /app

RUN rm -rf /app/public && \
    mkdir -p /app/public

COPY --from=0 /usr/local/bundle /usr/local/bundle
COPY --from=1 /code/dist /app/public/dist

#RUN groupadd -r app && useradd -r -d /app -g app app
RUN addgroup -S app && \
  adduser -S -G app -h /app -H app && \
  chown -R app:app /app
USER app

#VOLUME ["/app/var"]

CMD RACK_ENV=production bundle exec rake db:migrate && bundle exec puma -C puma.rb
EXPOSE 9292
