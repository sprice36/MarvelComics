CREATE TABLE customer (
    first_name varchar(25) NOT NULL,
    last_name varchar(35) NOT NULL,
    email varchar(50) PRIMARY KEY
);

CREATE TABLE comics (
    comic_id int PRIMARY KEY,
    title varchar(50) NOT NULL UNIQUE,
    description varchar(35),
    price numeric(6,2) NOT NULL,
    image varchar(30),
    characters varchar(100) NOT NULL,
    url varchar(30) NOT NULL
);

CREATE TABLE characters (
    character_id int PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,
    description varchar(50) NOT NULL,
    image varchar(30) NOT NULL,
    comic_list varchar(100) NOT NULL,
    comic_list_url varchar(30) NOT NULL
);

CREATE TABLE characters_collection (
    collectors_email varchar(50) NOT NULL REFERENCES customer(email),
    collectors_character_id integer NOT NULL REFERENCES characters(character_id),
    collectors_character_name varchar(50) NOT NULL REFERENCES characters(name)
);


CREATE TABLE comics_collection (
    collectors_email varchar(50) NOT NULL REFERENCES customer(email),
    collectors_comic_id integer NOT NULL REFERENCES comics(comic_id),
    collectors_comic_title varchar(50) NOT NULL REFERENCES comics(title)
);

