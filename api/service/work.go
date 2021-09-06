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
    basedirs := make(map[string][]string)
    for _, dir := range dirs {
        parts := strings.Split(dir, string(os.PathSeparator))
        l := len(parts)
        basedirs[parts[l-1]] = []string{parts[l-3], parts[l-2]}
    }

    // データベース内になくmedia内にあるなら作成
    for dir, _ := range basedirs {
        exists, err := Client.HExists("works", dir).Result()
        if err != nil {
            return err
        } else if exists {
            continue
        }

        work := model.Work{
            Title: dir,
            Maker: basedirs[dir][1],
            Media: basedirs[dir][0],
            ImageURL: "",
        }
        workJson, err := json.Marshal(work)
        if err != nil {
            return err
        }
        _, err = Client.HSet("works", dir, workJson).Result()
        if err != nil {
            return err
        }
    }

    // media内になくデータベース内にあるなら削除
    titles, err := Client.HKeys("works").Result()
    if err != nil {
        return err
    }
    for _, title := range titles {
        if err != nil {
            return err
        } else if _, ok := basedirs[title]; ok {
            continue
        }
        Client.HDel("works", title)
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
