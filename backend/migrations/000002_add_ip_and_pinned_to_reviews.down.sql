DROP INDEX idx_reviews_ip_address_created_at;

ALTER TABLE reviews
    DROP COLUMN ip_address,
    DROP COLUMN pinned;
