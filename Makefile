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

swagger_dev:
	docker-compose run --volume=${PWD}/swagger/build:/swagger --publish=8080:8080 swagger

test:
	docker-compose run app npm test