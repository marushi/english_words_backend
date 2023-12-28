FROM ruby:3.2.2

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs && \
  npm i -g yarn

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install --without development test

COPY . .

EXPOSE 3000

# CMD ["rails", "server", "-b", "0.0.0.0"]
