package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "github.com/Takachiha/ouchi-hub/controller"
)


func main() {
    gin.SetMode(gin.ReleaseMode)
    eng := gin.Default()
    eng.Use(cors.Default())

    v1 := eng.Group("/api/v1")
    {
        work := v1.Group("/works")
        {
            work.GET("", controller.ReadWorks)
            work.PUT("", controller.UpdateWorks)
            work.GET("/:title", controller.ReadWork)
            work.GET("/:title/*tree", controller.ReadWorkTree)
        }
    }

    eng.Run(":3000")
}
