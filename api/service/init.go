package service

import (
    "github.com/go-redis/redis"
    "fmt"
)

const MEDIA_URL = "/home/raspi/media"

var Client *redis.Client

func init() {
    db := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
    })
    fmt.Println("Redis Client is ready", db)
    Client = db
}


