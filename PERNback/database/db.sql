CREATE DATABASE utm;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    descripcion VARCHAR(255),
    fecha DATE
);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255)
);