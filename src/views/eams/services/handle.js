export function formatForm (form, submitForm) {
  formatServiceName(form, submitForm)
  formatInstanceMode(form, submitForm)
  formatContainerSizeMode(form, submitForm)
  formatZookeeperList(form, submitForm)
  formatMysql(form, submitForm)
  formatImage(form, submitForm)
  formatPort(form, submitForm)
}

function formatServiceName (form, submitForm) {
  submitForm.appName = `octopus-${form.serviceName}`
}
function formatInstanceMode (form, submitForm) {
  if (form.instanceMode === 'local') {
    submitForm.instances = 1
  } else {
    submitForm.instances = 2
  }
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
  submitForm.cpus = 1 * ratio
  submitForm.mem = 1024 * ratio
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
