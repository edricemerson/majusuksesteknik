package entity

import "time"

type Review struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Rating    int       `json:"rating"`
	Comment   string    `json:"comment"`
	CreatedAt time.Time `json:"created_at"`
	IPAddress string    `json:"-"`
	Pinned    bool      `json:"-"`
}
