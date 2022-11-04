package service

import (
    "github.com/go-redis/redis"
    "os"
)

var MEDIA_URL string
var DB_ADDRESS string

var Client *redis.Client

func init() {
    MEDIA_URL = os.Getenv("MEDIA_PATH")
    DB_ADDRESS = os.Getenv("DB_ADDRESS")

    db := redis.NewClient(&redis.Options{
        Addr: DB_ADDRESS,
    })
    Client = db
}


