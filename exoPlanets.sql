CREATE TABLE exoplanets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  distance_from_earth FLOAT,
  star_system VARCHAR(100),
  discovery_year INT
);


sql