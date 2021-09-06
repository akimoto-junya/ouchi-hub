package service

import (
    "github.com/go-redis/redis"
)

const MEDIA_URL = "/home/raspi/media"

var Client *redis.Client

func init() {
    db := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
    })
    Client = db
}


