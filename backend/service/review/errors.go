package review

import "errors"

var (
	ErrValidation = errors.New("validation failed")
	ErrNotFound   = errors.New("resource not found")
)
