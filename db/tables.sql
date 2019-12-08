DROP TABLE tasks;
DROP TABLE st_goals;
DROP TABLE lt_goals;
DROP TABLE users;

CREATE TABLE users
( user_id      SERIAL              NOT NULL
, email        VARCHAR(254) UNIQUE NOT NULL
, hash         VARCHAR(64)         NOT NULL
, created      DATE DEFAULT CURRENT_DATE
, last_login   DATE DEFAULT CURRENT_DATE
, PRIMARY KEY (user_id)
);

CREATE TABLE lt_goals
( lt_id     SERIAL         NOT NULL
, user_id   INTEGER        NOT NULL
, name      VARCHAR(256)   NOT NULL
, created   DATE DEFAULT CURRENT_DATE
, PRIMARY KEY (lt_id)
, FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE st_goals
( st_id     SERIAL         NOT NULL
, lt_id     INTEGER        NOT NULL
, user_id   INTEGER        NOT NULL
, name      VARCHAR(256)   NOT NULL
, created   DATE DEFAULT CURRENT_DATE
, PRIMARY KEY (st_id)
, FOREIGN KEY (lt_id) REFERENCES long_term(lt_id)
, FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE tasks
( task_id   SERIAL         NOT NULL
, user_id   INTEGER        NOT NULL
, st_id     INTEGER 
, name      VARCHAR(256)   NOT NULL
, created   DATE DEFAULT CURRENT_DATE
, PRIMARY KEY (task_id)
, FOREIGN KEY (user_id) REFERENCES users(user_id)
, FOREIGN KEY (st_id) REFERENCES st_goals(st_id)  
);

INSERT INTO users (email, hash)
VALUES
( 'test@test.com'
, 'test');