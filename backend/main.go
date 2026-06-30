package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/rs/cors"

	"backend/handler"
	"backend/repository"
	"backend/service/review"
	"backend/util"
)

func main() {
	_ = godotenv.Load()
	cfg, err := util.LoadConfig()
	if err != nil {
		log.Fatal(err)
	}

	db, err := util.ConnectDB(cfg)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	reviewRepo := repository.NewReviewRepository(db)
	reviewSvc := review.NewService(reviewRepo)
	reviewHandler := handler.NewReviewHandler(reviewSvc)

	mux := http.NewServeMux()
	mux.HandleFunc("POST /reviews", reviewHandler.Create)
	mux.HandleFunc("GET /reviews", reviewHandler.GetAll)
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	c := cors.New(cors.Options{
		AllowedOrigins: cfg.AllowedOrigins,
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	})

	var h http.Handler = mux
	h = c.Handler(h)
	h = util.Logger(h)
	h = util.Recover(h)

	log.Println("server starting on :" + cfg.Port)
	http.ListenAndServe(":"+cfg.Port, h)
}
