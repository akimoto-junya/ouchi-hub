package middleware

import (
    "github.com/gin-gonic/gin"
    "go.uber.org/zap"
    "log"
    "time"
)


func RequestLogger(c *gin.Context) {
    logger, err := zap.NewProduction()
    defer logger.Sync()
    if err != nil {
        log.Fatal(err.Error())
    }
    start := time.Now()
    userAgent := c.GetHeader("User-Agent")
    c.Next()
    logger.Info("Imcoming request",
        zap.String("URL", c.Request.URL.Path),
        zap.String("User-Agent", userAgent),
        zap.Int("status", c.Writer.Status()),
        zap.Duration("elapsed", time.Now().Sub(start)),
    )
}
