/* eslint-disable */
export function formatYmlOctForm (form, submitForm) {
  // formatServiceName(form, submitForm)
  // formatInstanceMode(form, submitForm)
  // formatContainerSizeMode(form, submitForm)
  // formatZookeeperList(form, submitForm)
  // formatMysql(form, submitForm)
  // formatImage(form, submitForm)
  // formatPort(form, submitForm)
  return submitForm
}

export function formatYmlSqdForm (form, submitForm) {
  formatSqdServiceName(form, submitForm)
  formatInstanceMode(form, submitForm)
  formatContainerSizeMode(form, submitForm)
  // formatZookeeperList(form, submitForm)
  // formatMysql(form, submitForm)
  // formatImage(form, submitForm)
  // formatPort(form, submitForm)
}

function formatServiceName (form, submitForm) {
  submitForm.name = `octopus-${form.serviceName}`
}

function formatSqdServiceName (form, submitForm) {
  submitForm.name = `squid-${form.serviceName}`
}

function formatInstanceMode (form, submitForm) {
  let instance = 1
  if (form.instanceMode === 'local') {
  } else {
    instance = 2
  }
  let rlpStr = `replicas: ${instance}\n`
  submitForm.yaml_raw.replace(/replicas: 1\n/g, rlpStr)
}

function formatContainerSizeMode (form, submitForm) {
  let ratio = 1
  let mode = form.containerSizeMode
  if (mode === 'low') {
  } else if (mode === 'medium') {
    ratio = 2
  } else {
    ratio = 4
  }
  submitForm.yaml_extra.octopusconsoleswan.resource = {
    "cpus": 1 * ratio,
    "mem": 1024 * ratio
  }
}

function formatZookeeperList (form, submitForm) {
  let zkArr = []
  form.zookeeperList.forEach((zk) => {
    zkArr.push(`${zk.ip}:${zk.port}`)
  })
  submitForm.env.VIP_SATURN_ZK_CONNECTION = zkArr.join(',')
}

function formatMysql (form, submitForm) {
  submitForm.env.SATURN_CONSOLE_DB_URL = 'jdbc:mysql://' + form.mysql.ip + ':' + form.mysql.port + '/saturn_console'
  submitForm.env.SATURN_CONSOLE_DB_USERNAME = form.mysql.username
  submitForm.env.SATURN_CONSOLE_DB_PASSWORD = form.mysql.password
}

function formatImage (form, submitForm) {
  submitForm.appName = form.serviceName
}

function formatPort (form, submitForm) {
  submitForm.container.docker.portMappings[0].containerPort = form.port
}
