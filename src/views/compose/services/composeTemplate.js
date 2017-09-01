export const COMPOSE_BASE = {
  'name': 'wordpressbp',
  'desc': 'wordpressbp',
  'yaml_raw': 'version: "3"\n \nservices:\n  wordpress: \n    image: "wordpress"\n    network_mode: "bridge"\n    environment: \n      - WORDPRESS_DB_HOST=db:3306\n      - WORDPRESS_DB_PASSWORD=Password\n    ports: \n      - 8080:80\n    depends_on:\n      - wordpressdb\n    logging:\n      options:\n        env: SWAN_TASK_ID,SWAN_TASK_NAME,SWAN_PORTS,SWAN_HOST,SWAN_PORT0,SWAN_APP_ID,SWAN_APP_VERSION\n        labels: JBORG_VCLUSTER,JBORG_USER_ID,JBORG_GROUP_ID,BEAT_EXCLUDE,JBORG_APP_ID\n\n  wordpressdb:\n    image: "mariadb"\n    network_mode: "host"\n    environment:\n      - MYSQL_ROOT_PASSWORD=Password\n    logging: \n      options:\n        env: SWAN_TASK_ID,SWAN_TASK_NAME,SWAN_PORTS,SWAN_HOST,SWAN_PORT0,SWAN_APP_ID,SWAN_APP_VERSION\n        labels: JBORG_VCLUSTER,JBORG_USER_ID,JBORG_GROUP_ID,BEAT_EXCLUDE,JBORG_APP_ID\n',
  'yaml_extra': {
    'wordpress': {
      'runas': 'bbk',
      'cluster': 'clusterest5555',
      'wait_delay': 180,
      'pull_always': false,
      'constraints': [
        {
          'attribute': 'vcluster',
          'operator': '==',
          'value': 'clusterest5555'
        }
      ],
      'uris': null,
      'ips': null,
      'resource': {
        'cpus': 0.01,
        'mem': 64
      },
      'proxy': {
        'enabled': true,
        'alias': 'g1.cn',
        'listen': 991,
        'sticky': false
      },
      'labels': {
        'JBORG_APP_ID': 'wordpress',
        'JBORG_VCLUSTER': 'clusterest5555',
        'JBORG_ESPROJECTID': 'projectid8888',
        'JBORG_ESUSERID': 'userid8888',
        'JBORG_GROUP_ID': '1',
        'JBORG_USER_ID': '1'
      }
    },
    'wordpressdb': {
      'runas': 'bbk',
      'cluster': 'clusterest5555',
      'wait_delay': 10,
      'pull_always': false,
      'constraints': [
        {
          'attribute': 'vcluster',
          'operator': '==',
          'value': 'clusterest5555'
        }
      ],
      'uris': null,
      'ips': null,
      'resource': {
        'cpus': 0.01,
        'mem': 64
      },
      'proxy': {
        'enabled': true,
        'alias': 'g2.cn',
        'listen': 992,
        'sticky': false
      },
      'labels': {
        'JBORG_APP_ID': 'wordpressdb',
        'JBORG_VCLUSTER': 'clusterest5555',
        'JBORG_ESPROJECTID': 'projectid8888',
        'JBORG_ESUSERID': 'userid8888',
        'JBORG_GROUP_ID': '1',
        'JBORG_USER_ID': '1'
      }
    }
  }
}
