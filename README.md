# Ouchi Hub

## 使い方

### 開発
.env

```shell
API_ADDRESS=http://localhost:3000/api/v1/
MEDIA_ADDRESS=http://localhost:8000/media
HOST_MEDIA_PATH=<media dir>
MEDIA_PATH=/home/user/media
DB_ADDRESS=db:6379

```

```bash
docker compose up

```

### デプロイ
.env.prod

```shell
API_ADDRESS=http://<address>:3000/api/v1/
MEDIA_ADDRESS=http://<address>/media
MEDIA_PATH=<media path>
DB_ADDRESS=<address>:6379

```

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml up

```

nginxの設定ファイル

```bash
ln -s <media_path> /var/www/html/media;

```

```
http {
    ...
    disable_symlinks off;
    server {
        listen 80;
        server_name 192.168.1.100;
        root /var/www/html;
        index index.html index.htm;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /media {
            autoindex on;
        }

    }
}

```

