export const COMPOSE_BASE = {
  name: 'b',
  desc: 'demo instance',
  version_id: 'xxx',
  service_group: {},
  yaml_raw: 'version: \'3\'\n\nservices:\n  web:\n    cap_add:\n      - ALL\n    cap_drop:\n      - NET_ADMIN\n      - SYS_ADMIN\n    command: \'sleep 100d\'\n    # cgroup_parent: \'/system.slice\'\n    container_name: \'my-web-container\'\n    deploy:\n      mode: replicated\n      replicas: 3\n    devices:\n        - \'/dev/tty10:/dev/tty10\'  \n    depends_on:\n      - cache\n      - dbmaster\n      - dbslave\n    dns:\n      - 114.114.114.114\n      - 8.8.8.8\n    dns_search:\n      - swan.local \n    tmpfs:\n      - /run\n      - /tmp\n    environment:\n      - DEMO=true\n      - PROD=false\n    expose:\n      - 80\n      - 443\n    extra_hosts:\n      - \'bbk:127.0.0.1\'\n      - \'google-dns:8.8.8.8\'\n    healthcheck:\n      test: [\'CMD\', \'echo\', \'ok\']\n      interval: 30s\n      timeout: 10s\n      retries: 3\n    image: \'nginx:latest\'\n    labels:\n      - \'name=bbklab\'\n      - \'description=bbklab desc\'\n    logging:\n      driver: syslog\n      # options:\n      # syslog-address: \'tcp://127.0.0.1:123\'\n    network_mode: \'bridge\'\n    pid: \'host\'\n    ipc: \'host\'\n    ports:\n      - \'3000-3003/udp\'\n      - \'8080:800/tcp\'\n      - \'8090:443\'\n    security_opt:\n      - label:user:USER\n      - label:role:ROLE\n    stop_grace_period: 10s\n    stop_signal: SIGTERM\n    ulimits:\n      nproc: 65535\n      nofile:\n        soft: 20000\n        hard: 40000\n    volumes:\n      - /tmp:/data:rw\n      - /var/log:/log:ro\n    restart: \'no\'\n    user: \'root\'\n    working_dir: \'/\'\n    domainname: \'foo.com\'\n    hostname: \'foo\'\n    mac_address: 02:42:ac:11:65:43\n    privileged: true\n    read_only: true\n    stdin_open: true\n    tty: true\n\n  cache:\n    image: \'redis:alpine\'\n    network_mode: \'bridge\'\n    deploy:\n      mode: replicated\n      replicas: 1\n    depends_on:\n      - dbmaster\n      - dbslave\n\n  dbslave:\n    image: \'busybox:latest\'\n    command: \'sleep 100d\'\n    network_mode: \'host\'\n    depends_on:\n      - dbmaster\n\n  dbmaster:\n    image: \'busybox:latest\'\n    command: \'sleep 100d\'\n    network_mode: \'host\'\n',
  yaml_env: {
    WORKDIR: '/bbklab',
    HOSTNAME: 'damn'
  },
  yaml_extra: {
    web: {
      priority: 4,
      runas: 'bbk',
      wait_delay: 1,
      pull_always: false,
      constraints: [],
      uris: null,
      ips: null,
      resource: {
        cpu: 0.01,
        mem: 50,
        disk: 100
      }
    },
    cache: {
      priority: 3,
      runas: 'bbk',
      wait_delay: 1,
      pull_always: false,
      constraints: [],
      uris: null,
      ips: null,
      resource: {
        cpu: 0.02,
        mem: 100,
        disk: 33
      }
    },
    dbmaster: {
      priority: 2,
      runas: 'bbk',
      wait_delay: 1,
      pull_always: false,
      constraints: [],
      uris: null,
      ips: null,
      resource: {
        cpu: 0.03,
        mem: 100
      }
    },
    dbslave: {
      priority: 1,
      runas: 'bbk',
      wait_delay: 1,
      pull_always: false,
      constraints: [],
      uris: null,
      ips: null,
      resource: {
        cpu: 0.03,
        mem: 100
      }
    }
  }
}
