export const YAML_BASE =
`version: "3"
services:
  wordpress:
    image: "offlineregistry.dataman-inc.com:5000/library/wordpress"
    network_mode: "bridge"
    deploy:
      replicas: 1
    environment:
      - WORDPRESS_DB_HOST=mariadb:3333
      - WORDPRESS_DB_PASSWORD=Password
    extra_hosts:
      - "mariadb:192.168.1.182"
    ports:
      - "80/tcp"
    depends_on:
      - mariadb
    resource:
      cpus: 0.1
      mem: 16
  mariadb:
    image: "offlineregistry.dataman-inc.com:5000/library/mariadb"
    network_mode: "bridge"
    deploy:
      replicas: 1
      wait_delay: 20
    environment:
      - MYSQL_ROOT_PASSWORD=Password
    ports:
      - 3306
    resource:
      cpus: 0.2
      mem: 100
    proxy:
      enabled: true
      listen: 3333`
