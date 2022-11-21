package service

import (
    "github.com/go-redis/redis"
    _ "embed"
)

//go:embed media_url.txt
var MEDIA_URL string
//go:embed db_address.txt
var DB_ADDRESS string

var Client *redis.Client

func init() {
    db := redis.NewClient(&redis.Options{
        Addr: DB_ADDRESS,
    })
    Client = db
}
