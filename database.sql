CREATE DATABASE todo_practice_database;

--\c into todo_practice_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);