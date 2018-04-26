#!/bin/bash 
#
#

VERSION=0.8.13

## npm build
npm run build

## build docker image
if [ $? -eq 0 ];then
	docker build --no-cache  -t demoregistry.dataman-inc.com/jborg/sgcloud-borg-ui:${VERSION} .
fi

