package main

import (
	"log"
	"os"

	"github.com/ANAS727189/url-shortener-redis/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func setupRoutes(app *fiber.App) {
	app.Get("/:url", routes.ResolveURL)
	app.Post("/api/v1", routes.ShortenURL)
}

func main() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatalf("Error loading .env file")
	// }
	_ = godotenv.Load()
	app := fiber.New()

	origins := os.Getenv("FRONTEND_URLS")
	if origins == "" {
		origins = "*"
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins: origins,
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New())

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "ok",
			"message": "URL Shortener backend is running 🚀",
		})
	})

	setupRoutes(app)

	log.Fatal(app.Listen(os.Getenv("APP_PORT")))
}
