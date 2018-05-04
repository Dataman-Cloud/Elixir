#!/bin/bash
#
#

VERSION=$1
if [ -z "$VERSION" ];then
	echo
	echo "usage: ./build.sh version"
	echo
	echo "example: ./build.sh 0.8.14"
	echo
	exit
fi

## npm install deps
npm install

## npm build
if [ $? -eq 0 ];then
    npm run build
fi

## build docker image
if [ $? -eq 0 ];then
    docker build --no-cache  -t demoregistry.dataman-inc.com/jborg/sgcloud-borg-ui:${VERSION} .
fi

## push docker image
docker push demoregistry.dataman-inc.com/jborg/sgcloud-borg-ui:${VERSION}
