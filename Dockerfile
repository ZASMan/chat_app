FROM ruby:3.0.2-slim

ENV BUILD_PACKAGES="build-essential" \
    DEV_PACKAGES="libpq-dev libsqlite3-dev" \
    APP_HOME="/var/www/welcome-chat"

RUN \
  # linux packages
  apt-get update -qq && apt-get install -y ${BUILD_PACKAGES} ${DEV_PACKAGES} && \
  # app directory
  mkdir -p ${APP_HOME} && \
  # bundler
  gem install --no-document bundler

# gems link
WORKDIR ${APP_HOME}
ADD ./Gemfile ${APP_HOME}
ADD ./Gemfile.lock ${APP_HOME}
RUN bundle install --jobs 20 --retry 3
ADD . ${APP_HOME}

ENTRYPOINT ["./bin/entrypoint.sh"]
EXPOSE 3000
CMD ["./bin/rails", "s", "-b", "0.0.0.0"]
