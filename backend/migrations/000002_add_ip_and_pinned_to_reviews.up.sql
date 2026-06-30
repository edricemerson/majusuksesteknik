ALTER TABLE reviews
    ADD COLUMN ip_address VARCHAR(64) NOT NULL DEFAULT '',
    ADD COLUMN pinned BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX idx_reviews_ip_address_created_at ON reviews (ip_address, created_at);
