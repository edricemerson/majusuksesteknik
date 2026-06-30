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
	const q = `INSERT INTO reviews (name, rating, comment)
               VALUES ($1, $2, $3)
               RETURNING id, created_at`
	return r.db.QueryRowContext(ctx, q, rev.Name, rev.Rating, rev.Comment).
		Scan(&rev.ID, &rev.CreatedAt)
}

func (r *ReviewRepository) FindAll(ctx context.Context, limit, offset int) ([]entity.Review, error) {
	const q = `SELECT id, name, rating, comment, created_at
               FROM reviews ORDER BY created_at DESC
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
