-include .env

all: build down up

pull:
	docker-compose pull

push:
	docker-compose push

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose  down

# $f [filename]
dotenv:
	docker build -t commands ./commands
	docker run commands /bin/sh -c 'python generate_dotenv.py && cat generate_dotenv/.env.example' > $(if $f,$f,.env)

test:
	make build && docker-compose run app npm test

dev:
	docker-compose run -d --volume=${PWD}/src:/app/ --publish=8000:31337 app node server.js

.PHONY: all pull push build up down dotenv test
