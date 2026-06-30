package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"backend/entity"
	"backend/service/review"
)

type CreateReviewRequest struct {
	Name    string `json:"name"`
	Rating  int    `json:"rating"`
	Comment string `json:"comment"`
}

type ReviewHandler struct {
	service review.Service
}

func NewReviewHandler(s review.Service) *ReviewHandler {
	return &ReviewHandler{service: s}
}

func (h *ReviewHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req CreateReviewRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.Name == "" || req.Comment == "" || req.Rating < 1 || req.Rating > 5 {
		writeError(w, http.StatusBadRequest, "name, comment, and rating (1-5) are required")
		return
	}

	rev := entity.Review{Name: req.Name, Rating: req.Rating, Comment: req.Comment}
	if err := h.service.Create(r.Context(), &rev); err != nil {
		writeError(w, http.StatusInternalServerError, "could not create review")
		return
	}
	writeJSON(w, http.StatusCreated, rev)
}

func (h *ReviewHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))

	reviews, err := h.service.GetAll(r.Context(), limit, offset)
	if err != nil {
		if errors.Is(err, review.ErrValidation) {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeError(w, http.StatusInternalServerError, "could not fetch reviews")
		return
	}
	writeJSON(w, http.StatusOK, reviews)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}
