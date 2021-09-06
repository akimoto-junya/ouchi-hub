package main

import (
    "github.com/gin-gonic/gin"
    "github.com/Takachiha/ouchi-hub/controller"
    "github.com/Takachiha/ouchi-hub/middleware"
)

func main() {
    gin.SetMode(gin.ReleaseMode)
    eng := gin.Default()
    eng.Use(middleware.RequestLogger)

    v1 := eng.Group("/api/v1")
    {
        work := v1.Group("/works")
        {
            work.GET("/", controller.ReadWorks)
            work.PUT("/", controller.UpdateWorks)
            work.GET("/:title", controller.ReadWork)
            work.GET("/:title/*tree", controller.ReadWorkTree)
        }
    }

    eng.Run(":3000")
}
