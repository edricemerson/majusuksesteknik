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
	PurgeExpired(ctx context.Context) (int64, error)
}

func NewService(r Repository) Service {
	return &service{repo: r}
}

func (s *service) Create(ctx context.Context, rev *entity.Review) error {
	exists, err := s.repo.ExistsRecentByIP(ctx, rev.IPAddress)
	if err != nil {
		return err
	}
	if exists {
		return ErrRateLimited
	}
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

func (s *service) PurgeExpired(ctx context.Context) (int64, error) {
	return s.repo.DeleteExpired(ctx)
}
