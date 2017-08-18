export const COMPOSE_BASE = {
  name: 'b',
  desc: 'demo blog instance: wordpress + mariadb',
  yaml_raw: 'version: \'3\'\n\nservices:\n  wordpress:\n    image: \'wordpress\'\n    network_mode: \'bridge\'\n    environment:\n      - WORDPRESS_DB_HOST=db:3306\n      - WORDPRESS_DB_PASSWORD=Password\n    ports:\n      - 8080:80\n    depends_on:\n      - db\n    dns:\n      - 192.168.1.196  # swan dns server\n\n  db:\n    image: \'mariadb\'\n    network_mode: \'host\'\n    environment:\n      - MYSQL_ROOT_PASSWORD=Password\n    dns:\n      - 192.168.1.196  # swan dns server\n',
  service_group: {},
  yaml_env: {
    WORKDIR: '/bbklab',
    HOSTNAME: 'damn'
  },
  yaml_extra: {
    wordpress: {
      runas: 'bbk',
      wait_delay: 1,
      pull_always: false,
      constraints: [

      ],
      uris: null,
      ips: null,
      resource: {
        cpu: 0.03,
        mem: 100
      }
    },
    db: {
      runas: 'bbk',
      wait_delay: 10,
      pull_always: false,
      constraints: [

      ],
      uris: null,
      ips: null,
      resource: {
        cpu: 0.03,
        mem: 300
      }
    }
  }
}
