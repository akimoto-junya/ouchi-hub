package service

import (
    "github.com/go-redis/redis"
    "fmt"
)

const MEDIA_URL = "media"

var db *redis.Client

func init() {
    db := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
        Password: "",
        DB: 0,
    })
    fmt.Println("Redis Client is ready", db)
}
