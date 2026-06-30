package review

import (
	"backend/entity"
	"context"
)

type service struct {
	repo Repository
}

type Service interface {
	Create(ctx context.Context, rev *entity.Review) error
	GetAll(ctx context.Context, limit, offset int) ([]entity.Review, error)
}

func NewService(r Repository) Service {
	return &service{repo: r}
}

func (s *service) Create(ctx context.Context, rev *entity.Review) error {
	return s.repo.Create(ctx, rev)
}

func (s *service) GetAll(ctx context.Context, limit, offset int) ([]entity.Review, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.FindAll(ctx, limit, offset)
}
