package main

import (
	"github.com/Takachiha/ouchi-hub/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
			work.PUT("/:title/image", controller.UpdateWorkImage)
		}
	}

	eng.Run(":3000")
}
