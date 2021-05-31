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

drop:
	docker volume rm such-a-lovely-js_db_volume

psql:
	docker container exec -it such-a-lovely-js_postgres_1 psql -U postgres --dbname survey_data

.PHONY: all pull push build up down dotenv test dev drop psql
