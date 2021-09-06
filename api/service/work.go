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
    dirs, err := filepath.Glob(MEDIA_URL +"/*/*/")
    if err != nil {
        return err
    }
    var basedirs map[string][]string
    for _, dir := range dirs {
        parts := strings.Split(dir, string(os.PathSeparator))
        l := len(parts)
        basedirs[filepath.Base(dir)] = []string{parts[l-3], parts[l-2]}
    }


    // media内になくデータベース内にあるなら削除
    titles, err := db.HKeys("works").Result()
    if err != nil {
        return err
    }
    for _, title := range titles {
        if err != nil {
            return err
        } else if _, ok := basedirs[title]; ok {
            continue
        }
        db.HDel("works", title)
        if err != nil {
            return err
        }
    }

    // データベース内になくmedia内にあるなら作成
    for dir, _ := range basedirs {
        exists, err := db.HExists("works", dir).Result()
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
        _, err = db.HSet("works", dir, workJson).Result()
        if err != nil {
            return err
        }
    }
    return nil
}

func (WorkService) ReadWorks() []model.Work {
    // タイトルを取得
    titles, err := db.SMembers("works").Result()
    if err != nil {
        return nil
    }
    // 取得したタイトルからjsonを取得
    var result []string
    for _, title := range titles {
        work, err := db.HGetAll(title).Result()
        if err != nil {
            return nil
        }
        result = append(result, work[title])
    }
    // 完全なjsonに変換
    worksJson := "[" + strings.Join(result, ",") + "]"
    var works []model.Work
    if err := json.Unmarshal([]byte(worksJson), &works); err != nil {
        return nil
    }
    return works
}
