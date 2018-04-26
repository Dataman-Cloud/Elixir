FROM nginx:1.13.8-alpine

maintainer  tom

COPY  dist  /etc/dist

COPY  nginx.conf /etc/nginx/nginx.conf

COPY  run.sh  /run.sh 

RUN   chmod a+x run.sh

EXPOSE  8002

CMD  ./run.sh
