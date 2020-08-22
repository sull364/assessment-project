CREATE TABLE users
(
  "userid" serial PRIMARY KEY,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL
);

-- SELECT setval('users_userid_seq', 1, false);

CREATE TABLE lists
(
  "listid" serial PRIMARY KEY,
  "title" varchar NOT NULL,
  "completed" boolean NOT NULL,
  "userid" bigint NOT NULL,
  FOREIGN KEY (userid) REFERENCES users (userid)
);

-- SELECT setval('lists_listid_seq', 1, false);

-- DROP TABLE users
-- DROP TABLE lists

-- INSERT INTO USERS
--   (email, password)
-- VALUES('lumie.song@gmail.com', 'dangernoodle123')