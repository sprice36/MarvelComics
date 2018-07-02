CREATE TABLE customer (
   Username varchar(50) PRIMARY KEY NOT NULL, 
   first_name varchar(25) NOT NULL, 
   email varchar(50) UNIQUE 
);

CREATE TABLE comics (
   comic_id int PRIMARY KEY,
   title varchar(50) NOT NULL UNIQUE,
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
   username varchar(50)  REFERENCES customer(username),
   collectors_email varchar(50) UNIQUE REFERENCES customer(email),
   character_id integer REFERENCES characters(character_id),
   character_name varchar REFERENCES characters(name) ,
   character_image varchar 

); 

CREATE TABLE comics_collection (
   username varchar(50) REFERENCES customer(username),
   collectors_email varchar(50) UNIQUE REFERENCES customer(email),
   comic_id integer REFERENCES comics(comic_id),
   title varchar(50) UNIQUE REFERENCES comics(title),
   collectors_image varchar 
);

CREATE TABLE characters-comics (
  Url varchar(100) PRIMARY KEY 
  json_data varchar
)



