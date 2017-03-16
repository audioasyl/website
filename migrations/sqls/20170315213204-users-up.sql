CREATE TABLE users (
  id serial primary key,
  access_token varchar(256) NOT NULL UNIQUE,
  provider_id varchar(60) NOT NULL UNIQUE,
  token varchar(256) NOT NULL UNIQUE,
  profile_url varchar(60),
  first_name varchar(60),
  last_name varchar(60),
  provider varchar(60),
  gender varchar(60),
  email varchar(60)
);
