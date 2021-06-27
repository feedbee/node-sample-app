#!/bin/bash

# Run options
EXPOSE_PORT=${EXPOSE_PORT:-8080}

# Run and build options
LISTEN_HOST=0.0.0.0
LISTEN_PORT=3000

# Build options
LOCAL_IMAGE="${LOCAL_IMAGE:-node-app}"

# Push and pull options
REMOTE_IMAGE="${REMOTE_IMAGE:-feedbee/node-sample-app}"

# Push, pull and build options
VERSION="${VERSION:-latest}"

CMD=$1
if [[ "$CMD" == "run" ]]; then

    docker run -it --rm --name node-app \
        -v "$PWD":/usr/src/app -w /usr/src/app \
        -p $EXPOSE_PORT:$LISTEN_PORT -e HOST="$LISTEN_HOST" -e PORT="$LISTEN_PORT" \
        node:alpine node server.js

elif [[ "$CMD" == "run-image" ]]; then

    docker run -it --rm --name node-app -p $EXPOSE_PORT:$LISTEN_PORT $LOCAL_IMAGE

elif [[ "$CMD" == "build" ]]; then
    
    docker build --tag $LOCAL_IMAGE:$VERSION .

elif [[ "$CMD" == "push" ]]; then

    docker tag $LOCAL_IMAGE:$VERSION $REMOTE_IMAGE:$VERSION
    docker push $REMOTE_IMAGE:$VERSION

elif [[ "$CMD" == "pull" ]]; then

    docker pull $REMOTE_IMAGE:$VERSION
    docker tag $REMOTE_IMAGE:$VERSION $LOCAL_IMAGE:$VERSION

else

    echo "Usage: ./do.sh run | run-image | build | push | pull | help"
    echo "For more information please check the repo https://github.com/feedbee/node-sample-app"

fi
