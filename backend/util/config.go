package util

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type Config struct {
	DatabaseURL    string
	JWTSecret      string
	Port           string
	Env            string
	ReadTimeout    time.Duration
	AllowedOrigins []string
}

func LoadConfig() (*Config, error) {
	cfg := &Config{
		DatabaseURL:    os.Getenv("DATABASE_URL"),
		JWTSecret:      os.Getenv("JWT_SECRET"),
		Port:           getOr("PORT", "8080"),
		Env:            getOr("APP_ENV", "development"),
		ReadTimeout:    10 * time.Second,
		AllowedOrigins: splitCSV(getOr("FRONTEND_URL", "http://localhost:5173")),
	}

	if cfg.DatabaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}
	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is required")
	}
	return cfg, nil
}

func getOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func splitCSV(v string) []string {
	parts := strings.Split(v, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if p = strings.TrimSpace(p); p != "" {
			out = append(out, p)
		}
	}
	return out
}
