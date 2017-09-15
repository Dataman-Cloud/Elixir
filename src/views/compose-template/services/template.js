export const YAML_BASE =
`version: "3"
services:
  wordpress:
    image: "wordpress"
    network_mode: "bridge"
    deploy:
      replicas: 1
      constraints:
        - attribute: "vcluster"
          operator: "=="
          value: "eams"
    environment:
      - WORDPRESS_DB_HOST=mariadb:3343
      - WORDPRESS_DB_PASSWORD=Password
    ports:
      - "80/tcp"
    depends_on:
      - mariadb
    proxy:
      enabled: true
      alias: "x.cn"
      listen: 8888
      sticky: false
  mariadb:
    image: "mariadb"
    network_mode: "bridge"
    deploy:
      replicas: 1
      wait_delay: 20
      constraints:
        - attribute: "vcluster"
          operator: "=="
          value: "eams"
    environment:
      - MYSQL_ROOT_PASSWORD=Password
    ports:
      - 3343
    proxy:
      enabled: true
      alias: "i.cn"
      listen: 3343
      sticky: false`
