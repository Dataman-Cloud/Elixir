export const YAML_BASE =
  `version: "3"
  services:
    wordpress:
      image: "wordpress"
      network_mode: "bridge"
      deploy:
        replicas: 1
        constraints:
          - attribute: "hostname"
            operator: "~="
            value: "130"
      environment:
        - WORDPRESS_DB_HOST=mariadb:3306
        - WORDPRESS_DB_PASSWORD=Password
      ports:
        - "80/tcp"
      depends_on:
        - mariadb
      dns:
        - 192.168.1.196  # swan dns server
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
          - attribute: "hostname"
            operator: "~="
            value: "130"
      environment:
        - MYSQL_ROOT_PASSWORD=Password
      ports:
        - 3306
      dns:
        - 192.168.1.196  # swan dns server
      proxy:
        enabled: true
        alias: "i.cn"
        listen: 3306
        sticky: false`
