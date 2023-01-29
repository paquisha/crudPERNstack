CREATE DATABASE utm;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    descripcion VARCHAR(255),
    fecha DATE
);