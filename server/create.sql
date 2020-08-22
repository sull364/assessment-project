CREATE TABLE users
(
  "userid" serial PRIMARY KEY,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  UNIQUE(email)
);

-- SELECT setval('users_userid_seq', 1, false);

CREATE TABLE lists
(
  "listid" serial PRIMARY KEY,
  "title" varchar NOT NULL CHECK ( title <> ''),
  "completed" boolean NOT NULL,
  "email" varchar NOT NULL,
  UNIQUE(title),
  FOREIGN KEY (email) REFERENCES users (email)
);

-- SELECT setval('lists_listid_seq', 1, false);

-- DROP TABLE users
-- DROP TABLE lists

-- INSERT INTO USERS
--   (email, password)
-- VALUES('lumie.song@gmail.com', 'dangernoodle123')

-- INSERT INTO lists
--   (title, completed, email)
-- VALUES('clean dog poop', false, 'lumie.song@gmail.com')
-- RETURNING title