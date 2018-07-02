CREATE TABLE customer (
  name varchar(25) NOT NULL,
  image varchar(100),
  email varchar(50) UNIQUE,
  display_name varchar(50),
  user_id varchar(50) PRIMARY KEY 
);

CREATE TABLE comics (
  comic_id int PRIMARY KEY,
  title varchar(150) NOT NULL UNIQUE,
  description varchar,
  image varchar,
  characters varchar
);

CREATE TABLE characters (
  character_id int PRIMARY KEY,
  name varchar NOT NULL UNIQUE,
  description varchar,
  image varchar
);


CREATE TABLE characters_collection (
  username varchar(50)  REFERENCES customer(user_id),
  collectors_email varchar(50) UNIQUE REFERENCES customer(email),
  character_id integer REFERENCES characters(character_id),
  character_name varchar REFERENCES characters(name) ,
  character_image varchar

);

CREATE TABLE comics_collection (
  username varchar(50) REFERENCES customer(user_id),
  collectors_email varchar(50) UNIQUE REFERENCES customer(email),
  comic_id integer REFERENCES comics(comic_id),
  title varchar(150) UNIQUE REFERENCES comics(title),
  collectors_image varchar 
);

CREATE TABLE characters-comics (
  Url varchar(100) PRIMARY KEY 
  json varchar
)



