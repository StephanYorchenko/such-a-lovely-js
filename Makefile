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

swagger_dev:
	docker-compose run --volume=${PWD}/swagger/build:/swagger --publish=8080:8080 swagger

test:
	make build && docker-compose run app npm test

dev:
	docker-compose run -d --volume=${PWD}/src:/app/ --publish=8000:31337 app node server.js

drop:
	docker volume rm such-a-lovely-js_db_volume

psql:
	docker container exec -it such-a-lovely-js_postgres_1 psql -U postgres --dbname survey_data

logs:
	docker-compose logs -f

.PHONY: all pull push build up down dotenv test dev drop psql logs

publish:
	@docker-compose -f docker-compose.publish.yml build
	@docker-compose -f docker-compose.publish.yml push
	@docker tag stepan33314/$(PROJECT_NAME)_app:latest stepan33314/$(PROJECT_NAME)_app:$(VERSION)
	@docker push stepan33314/$(PROJECT_NAME)_app:$(VERSION)
