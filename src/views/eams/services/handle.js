/* eslint-disable */
export function formatYmlOctForm (form, submitForm, context) {
  formatServiceName(form, submitForm)
  formatInstanceMode(form, submitForm)
  formatContainerSizeMode(form, submitForm)
  // formatZookeeperList(form, submitForm)
  formatMysql(form, submitForm)
  formatImage(form, submitForm)
  formatPort(form, submitForm)
  formatCluster(form, submitForm)
  formatOtherEnvs(form, submitForm, context)
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
  submitForm.yamlText.replace(/replicas: 1\n/g, rlpStr)
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
  let cpusStr = `cpus: ${1*ratio}\n`
  let memStr = `mem: ${1024*ratio}\n`
  submitForm.yamlText.replace(/cpus: 1\n/g, cpusStr)
  submitForm.yamlText.replace(/mem: 512/g, cpusStr)
}

function formatZookeeperList (form, submitForm) {
  let zkArr = []
  form.zookeeperList.forEach((zk) => {
    zkArr.push(`${zk.ip}:${zk.port}`)
  })
  submitForm.env.VIP_SATURN_ZK_CONNECTION = zkArr.join(',')
}

function formatMysql (form, submitForm) {
  submitForm.envs.MYSQL_URL = `jdbc:mysql://${form.mysql.ip}:${form.mysql.port}/Octopus_Test?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true`
  submitForm.envs.SPRING_DATASOURCE_USERNAME = form.mysql.username
  submitForm.envs.SPRING_DATASOURCE_PASSWORD = form.mysql.password
}

function formatImage (form, submitForm) {
  let WEB_IMG = `${form.image.Image}:${form.image.tag}`
  let CONSOLE_IMG = `${form.imageB.Image}:${form.imageB.tag}`
  submitForm.yamlText = submitForm.yamlText.replace(/octopusconsoleimg/g, WEB_IMG)
  submitForm.yamlText = submitForm.yamlText.replace(/octopusapiimg/g, CONSOLE_IMG)
}

function formatPort (form, submitForm) {
  // console.log(form.port)
  let portStr = `${form.port}`
  submitForm.envs.CONSOLE_PORT = portStr
  // submitForm.yamlText.replace(/CONSOLEPORT/g, portStr)
  // console.log(submitForm.yamlText)
}

function formatCluster (form, submitForm) {
  submitForm.cluster = form.cluster
}
function formatOtherEnvs (form, submitForm, context) {
  submitForm.envs.USER_ID = context.userId + ""
  submitForm.envs.GROUP_ID = context.currentGroupId + ""
}
