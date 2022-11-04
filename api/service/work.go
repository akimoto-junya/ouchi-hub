package service

import (
    "path/filepath"
    "encoding/json"
    "strings"
    "os"
    "github.com/Takachiha/ouchi-hub/model"
)

type WorkService struct {}

func (WorkService) UpdateWorks() error {
    // 作品名をmedia内から取得しMap作成
    dirs, err := filepath.Glob(filepath.Join(MEDIA_URL, "/*/*/*"))

    if err != nil {
        return err
    }

    basedirs := [][]string{}
    for _, dir := range dirs {
        parts := strings.Split(dir, string(os.PathSeparator))
        l := len(parts)
        basedirs = append(basedirs, []string{parts[l-3], parts[l-2], parts[l-1]})
    }

    containedkeys := make(map[string]struct{})

    // データベース内になくmedia内にあるなら作成
    for _, mediadir := range basedirs {
        title, group, media := mediadir[2], mediadir[1], mediadir[0]
        key := strings.Join(mediadir, "/")
        containedkeys[key] = struct{}{}

        exists, err := Client.HExists("works", key).Result()
        if err != nil {
            return err
        } else if exists {
            continue
        }

        work := model.Work{
            Title: title,
            Group: group,
            Media: media,
            ImageURL: "",
        }
        workJson, err := json.Marshal(work)
        if err != nil {
            return err
        }
        _, err = Client.HSet("works", key, workJson).Result()
        if err != nil {
            return err
        }
    }

    // media内になくデータベース内にあるなら削除
    keys, err := Client.HKeys("works").Result()
    if err != nil {
        return err
    }
    for _, key := range keys {
        if err != nil {
            return err
        } else if _, ok := containedkeys[key]; ok {
            continue
        }
        Client.HDel("works", key)
        if err != nil {
            return err
        }
    }
    return nil
}

func (WorkService) ReadWorks() []model.Work {
    // 取得したタイトルからjsonを取得
    result, err := Client.HVals("works").Result()
    if err != nil {
        return nil
    }
    worksJson := "[" + strings.Join(result, ",") + "]"
    // 完全なjsonに変換
    var works []model.Work
    if err := json.Unmarshal([]byte(worksJson), &works); err != nil {
        return nil
    }
    return works
}

func (WorkService) ReadWork(title string) *model.Work {
    workJson, err := Client.HGet("works", title).Result()
    if err != nil {
        return nil
    }
    var work model.Work
    if err := json.Unmarshal([]byte(workJson), &work); err != nil {
        return nil
    }
    return &work
}

func (WorkService) UpdateWorkImageURL(work *model.Work) error {
    workJson, err := json.Marshal(work)
    if err != nil {
        return err
    }
    _, err = Client.HSet("works", work.Title, workJson).Result()
    if err != nil {
        return err
    }
    return nil
}
