package review

import (
	"backend/entity"
	"context"
)

type Repository interface {
	Create(ctx context.Context, rev *entity.Review) error
	FindAll(ctx context.Context, limit, offset int) ([]entity.Review, error)
}
