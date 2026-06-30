CREATE TABLE reviews (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    rating     INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment    TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);