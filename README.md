# node-sample-app
Dockerized sample NodeJS application for testing, exploring and learning purposes

## Usage

`./do.sh run | run-image | build | push | pull | help`

- `./do.sh run` runs the app in a Docker container without building an image
- `./do.sh build` builds local `node-app` Docker image (unless the image name is overriden by `$LOCAL_IMAGE` env var)
- `./do.sh run-image` runs local `node-app` Docker image (unless the image name is overriden by `$LOCAL_IMAGE` env var)
- `./do.sh push` pushes local `node-app` Docker image to Dockerhub (default `feedbee/node-sample-app`, can be overreiden by `$REMOTE_IMAGE` env var)
- `./do.sh push` pulls `node-app` Docker image from Dockerhub (default `feedbee/node-sample-app`, can be overreiden by `$REMOTE_IMAGE` env var)
- `./do.sh push` prints usage information

## Docker

Public image is uploaded to https://hub.docker.com/r/feedbee/node-sample-app
See [Dockerfile](./Dockerfile) for details.

Default URL for dockerized app running locally is http://127.0.0.1:8080/. You can override the 8080 port with environment variable `EXPOSE_PORT`, for instance `EXPOSE_PORT=8000 ./do.sh run` will start the app in a Docker container listening for port 8000 instead of default 8080.
