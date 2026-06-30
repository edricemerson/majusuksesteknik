package repository

import (
	"backend/entity"
	"context"
	"database/sql"
)

type ReviewRepository struct {
	db *sql.DB
}

func NewReviewRepository(db *sql.DB) *ReviewRepository {
	return &ReviewRepository{db: db}
}

func (r *ReviewRepository) Create(ctx context.Context, rev *entity.Review) error {
	const q = `INSERT INTO reviews (name, rating, comment, ip_address)
               VALUES ($1, $2, $3, $4)
               RETURNING id, created_at`
	return r.db.QueryRowContext(ctx, q, rev.Name, rev.Rating, rev.Comment, rev.IPAddress).
		Scan(&rev.ID, &rev.CreatedAt)
}

func (r *ReviewRepository) FindAll(ctx context.Context, limit, offset int) ([]entity.Review, error) {
	const q = `SELECT id, name, rating, comment, created_at
               FROM reviews
               WHERE pinned OR created_at > NOW() - INTERVAL '1 day'
               ORDER BY created_at DESC
               LIMIT $1 OFFSET $2`
	rows, err := r.db.QueryContext(ctx, q, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	reviews := []entity.Review{}
	for rows.Next() {
		var rev entity.Review
		if err := rows.Scan(&rev.ID, &rev.Name, &rev.Rating, &rev.Comment, &rev.CreatedAt); err != nil {
			return nil, err
		}
		reviews = append(reviews, rev)
	}
	return reviews, rows.Err()
}

func (r *ReviewRepository) ExistsRecentByIP(ctx context.Context, ip string) (bool, error) {
	const q = `SELECT EXISTS(
                   SELECT 1 FROM reviews
                   WHERE ip_address = $1 AND created_at > NOW() - INTERVAL '1 day'
               )`
	var exists bool
	err := r.db.QueryRowContext(ctx, q, ip).Scan(&exists)
	return exists, err
}

func (r *ReviewRepository) DeleteExpired(ctx context.Context) (int64, error) {
	const q = `DELETE FROM reviews WHERE NOT pinned AND created_at <= NOW() - INTERVAL '1 day'`
	res, err := r.db.ExecContext(ctx, q)
	if err != nil {
		return 0, err
	}
	return res.RowsAffected()
}
