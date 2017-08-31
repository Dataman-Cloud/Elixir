export const COMPOSE_BASE = {
  'name': 'wordpressbp',
  'desc': 'wordpressbp',
  'yaml_raw': 'version: "3"\n\nservices:\n  wordpress:\n    image: "wordpress"\n    network_mode: "bridge"\n    environment:\n      - WORDPRESS_DB_HOST=db:3306\n      - WORDPRESS_DB_PASSWORD=Password\n    ports:\n      - 8080:80\n    depends_on:\n      - wordpressdb\n    dns:\n      - 192.168.0.10  # swan dns server\n\n  wordpressdb:\n    image: "mariadb"\n    network_mode: "host"\n    environment:\n      - MYSQL_ROOT_PASSWORD=Password\n    dns:\n      - 192.168.0.10  # swan dns server\n',
  'yaml_extra': {
    'wordpress': {
      'runas': 'bbk',
      'cluster': 'clusterest5555',
      'wait_delay': 180,
      'pull_always': false,
      'constraints': [{
        'attribute': 'vcluster',
        'operator': '==',
        'value': 'clusterest5555'
      }],
      'uris': null,
      'ips': null,
      'resource': {
        'cpus': 0.01,
        'mem': 64
      },
      'container': {
        'docker': {
          'parameters': [
            {
              'key': 'label',
              'value': 'JBORG_APP_ID=wordpress'
            },
            {
              'key': 'log-opt',
              'value': 'labels=JBORG_VCLUSTER,JBORG_USER_ID,JBORG_GROUP_ID,BEAT_EXCLUDE,JBORG_APP_ID'
            },
            {
              'key': 'log-opt',
              'value': 'env=SWAN_TASK_ID,SWAN_TASK_NAME,SWAN_PORTS,SWAN_HOST,SWAN_PORT0,SWAN_APP_ID,SWAN_APP_VERSION'
            },
            {
              'key': 'label',
              'value': 'JBORG_VCLUSTER=clusterest5555'
            },
            {
              'key': 'label',
              'value': 'JBORG_USER_ID=1'
            },
            {
              'key': 'label',
              'value': 'JBORG_GROUP_ID=1'
            },
            {
              'key': 'label',
              'value': 'BEAT_EXCLUDE=false'
            }
          ]

        }

      },
      'labels': {
        'JBORG_ESPROJECTID': 'projectid8888',
        'JBORG_ESUSERID': 'userid8888',
        'JBORG_GROUP_ID': '1',
        'JBORG_USER_ID': '1',
        'JBORG_VCLUSTER': 'clusterest5555'
      }
    },
    'wordpressdb': {
      'runas': 'bbk',
      'cluster': 'clusterest5555',
      'wait_delay': 10,
      'pull_always': false,
      'constraints': [{
        'attribute': 'vcluster',
        'operator': '==',
        'value': 'clusterest5555'
      }],
      'uris': null,
      'ips': null,
      'resource': {
        'cpus': 0.01,
        'mem': 64
      },
      'container': {
        'docker': {
          'parameters': [
            {
              'key': 'label',
              'value': 'JBORG_APP_ID=wordpressdb'
            },
            {
              'key': 'log-opt',
              'value': 'labels=JBORG_VCLUSTER,JBORG_USER_ID,JBORG_GROUP_ID,BEAT_EXCLUDE,JBORG_APP_ID'
            },
            {
              'key': 'log-opt',
              'value': 'env=SWAN_TASK_ID,SWAN_TASK_NAME,SWAN_PORTS,SWAN_HOST,SWAN_PORT0,SWAN_APP_ID,SWAN_APP_VERSION'
            },
            {
              'key': 'label',
              'value': 'JBORG_VCLUSTER=clusterest5555'
            },
            {
              'key': 'label',
              'value': 'JBORG_USER_ID=1'
            },
            {
              'key': 'label',
              'value': 'JBORG_GROUP_ID=1'
            },
            {
              'key': 'label',
              'value': 'BEAT_EXCLUDE=false'
            }
          ]

        }

      },
      'labels': {
        'JBORG_ESPROJECTID': 'projectid8888',
        'JBORG_ESUSERID': 'userid8888',
        'JBORG_GROUP_ID': '1',
        'JBORG_USER_ID': '1',
        'JBORG_VCLUSTER': 'clusterest5555'
      }
    }
  }
}
