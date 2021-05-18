FROM node:14.2.0-alpine3.11

RUN mkdir app && mkdir app/sessions

WORKDIR /app/

COPY ./package*.json ./

RUN npm ci && \
    wget -qO- https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for > /wait-for && \
    chmod +x /wait-for && \
    chmod +x ./sessions

COPY . .
