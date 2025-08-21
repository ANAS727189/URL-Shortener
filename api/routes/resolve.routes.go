package routes

import (
	"github.com/ANAS727189/url-shortener-redis/db"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

func ResolveURL(c *fiber.Ctx) error {
	url := c.Params("url")

	r := db.CreateClient(0)
	defer r.Close()

	val, err := r.Get(db.Ctx, url).Result()
	if err == redis.Nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "URL not found"})
	} else if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Internal server error"})
	}

	rInr := db.CreateClient(1)
	defer rInr.Close()

	_ = rInr.Incr(db.Ctx, "counter")
	return c.Redirect(val, 301)
}
