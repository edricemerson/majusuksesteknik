package review

import "errors"

var (
	ErrValidation  = errors.New("validation failed")
	ErrNotFound    = errors.New("resource not found")
	ErrRateLimited = errors.New("you can only post one review per day")
)
