FROM golang:1.19.2-alpine3.15

RUN apk add tree git && \
    go install github.com/cosmtrek/air@latest

WORKDIR /home/api
COPY ./air.toml ./
