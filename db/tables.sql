CREATE TABLE users
( email        VARCHAR(40) PRIMARY KEY UNIQUE NOT NULL
, password     VARCHAR(64) NOT NULL
, created      DATE DEFAULT CURRENT_DATE
, last_login   DATE DEFAULT CURRENT_DATE
);

INSERT INTO users (email, password)
VALUES
( 'test@test.com'
, 'test');