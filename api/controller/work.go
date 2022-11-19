package controller

import (
	"encoding/json"
	"github.com/Takachiha/ouchi-hub/service"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type Node struct {
	Name     string `json:"name"`
	NodeType string `json:"type"`
	Contents []Node `json:"contents,omitempty"`
}

func ReadTree(path string) ([]Node, error) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return nil, err
	}
	out, err := exec.Command("tree", "-J", "-L", "1", path).Output()
	if err != nil {
		return nil, err
	}

	var m []Node
	var result []Node
	json.Unmarshal([]byte(string(out)), &m)

	for _, item := range m {
		if item.NodeType == "directory" {
			result = item.Contents
			break
		}
	}

	return result, nil
}

func ReadWorks(c *gin.Context) {
	workService := service.WorkService{}
	works := workService.ReadWorks()
	if works == nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not read works",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"works": works,
	})

}

func UpdateWorks(c *gin.Context) {
	workService := service.WorkService{}
	err := workService.UpdateWorks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not read works",
		})
		return
	}
	c.Writer.WriteHeader(http.StatusNoContent)
}

func ReadWork(c *gin.Context) {
	media := c.Query("media")
	group := c.Query("group")
	title := c.Param("title")
	key := strings.Join([]string{media, group, title}, "-")
	workService := service.WorkService{}
	work := workService.ReadWork(key)
	if work == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Specified path is not found",
		})
		return
	}

	tree, err := ReadTree(filepath.Join(service.MEDIA_URL, work.Media, work.Group, title))

	if err != nil || tree == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Specified path is not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"title":    title,
		"media":    work.Media,
		"group":    work.Group,
		"imageURL": work.ImageURL,
		"tree":     tree,
	})
}

func ReadWorkTree(c *gin.Context) {
	media := c.Query("media")
	group := c.Query("group")
	title := c.Param("title")
	key := strings.Join([]string{media, group, title}, "-")
	workService := service.WorkService{}
	work := workService.ReadWork(key)
	if work == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Specified path is not found",
		})
		return
	}
	tree, err := ReadTree(filepath.Join(service.MEDIA_URL, work.Media, work.Group, title, c.Param("tree")))

	if err != nil || tree == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Specified path is not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"title":    title,
		"media":    work.Media,
		"group":    work.Group,
		"imageURL": work.ImageURL,
		"tree":     tree,
	})
}

func UpdateWorkImage(c *gin.Context) {
	type Image struct {
		URL string
	}
	var image Image
	title := c.Param("title")
	c.BindJSON(&image)
	workService := service.WorkService{}
	work := workService.ReadWork(title)
	if work == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Specified path is not found",
		})
		return
	} else if image.URL == "" {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Image url in request body is not found",
		})
		return
	}
	work.ImageURL = image.URL
	err := workService.UpdateWorkImageURL(work)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Specified path is not found",
		})
		return
	}
}
