CREATE TABLE customer (
    name varchar(25) NOT NULL,
    image varchar(100),
    email varchar(50) UNIQUE,
    display_name varchar(50),
    user_id varchar(50) PRIMARY KEY
);

CREATE TABLE comics (
    comic_id int PRIMARY KEY,
    title varchar(100) NOT NULL UNIQUE,
    description varchar(1000),
    price numeric(6,2),
    image varchar(1000),
    characters varchar(1000),
    url varchar(1000)
);

CREATE TABLE characters (
    character_id int PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    description varchar(1000),
    image varchar(1000) NOT NULL,
    comic_list varchar(1000),
    comic_list_url varchar(1000)
);

CREATE TABLE characters_collection (
    collector_id varchar(50) NOT NULL REFERENCES customer(user_id),
    collectors_character_id integer NOT NULL REFERENCES characters(character_id),
    collectors_character_name varchar(50) NOT NULL REFERENCES characters(name)
);


CREATE TABLE comics_collection (
    collector_id varchar(50) NOT NULL REFERENCES customer(user_id),
    collectors_comic_id integer NOT NULL REFERENCES comics(comic_id),
    collectors_comic_title varchar(50) NOT NULL REFERENCES comics(title)
);

CREATE TABLE characters_comics (
   url character varying PRIMARY KEY,
   json character varying NOT NULL
);

/*
INSERT INTO characters_comics (
  url, json
) VALUES ('http://gateway.marvel.com/v1/public/characters/1011256/comics?hasDigitalIssue=true&orderBy=title&limit=10' , 
     $$ { offset: 0,
  limit: 10,
  total: 1,
  count: 1,
  results: 
   [ { id: 13425,
       digitalId: 8093,
       title: 'Daredevil (1998) #97',
       issueNumber: 97,
       variantDescription: '',
       description: 'As Matt Murdock strives to bring order to the chaos of Hell\'s Kitchen, things take another turn for the worse. Gladiator is on the loose, running for his life, and Daredevil is the only one who can stop him from hurting anyone and everyone who gets in his way.',
       modified: '2016-03-02T15:41:28-0500',
       isbn: '',
       upc: '5960604706-09711',
       diamondCode: '',
       ean: '',
       issn: '',
       format: 'Comic',
       pageCount: 0,
       textObjects: [Array],
       resourceURI: 'http://gateway.marvel.com/v1/public/comics/13425',
       urls: [Array],
       series: [Object],
       variants: [],
       collections: [],
       collectedIssues: [],
       dates: [Array],
       prices: [Array],
       thumbnail: [Object],
       images: [Array],
       creators: [Object],
       characters: [Object],
       stories: [Object],
       events: [Object] } ] } $$



 ); */

-- INSERT INTO characters_comics (
--     url, json
-- ) VALUES ( ${`requestURL`}, ${`comics.data`}
-- )

-- SELECT json 
-- FROM characters_comics 
-- WHERE  comicURL == url;