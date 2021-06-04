-include .env

PROJECT_NAME=such-a-lovely-js

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
	docker-compose run app npm test

publish:
	@docker-compose -f docker-compose.publish.yml build
	@docker-compose -f docker-compose.publish.yml push
	@docker tag stepan33314/$(PROJECT_NAME)_app:latest stepan33314/$(PROJECT_NAME)_app:$(VERSION)
	@docker push stepan33314/$(PROJECT_NAME)_app:$(VERSION)
