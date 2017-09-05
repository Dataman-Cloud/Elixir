import * as miniform from './form'

export function formatForm (form) {
  let submitForm = miniform.getSubmitForm()
  // formatServiceName(form, submitForm)
  // formatInstanceMode(form, submitForm)
  // formatContainerSizeMode(form, submitForm)
  // formatSsh(form, submitForm)
  // formatPort(form, submitForm)
  return submitForm
}

// function formatServiceName (form, submitForm) {
//   submitForm.name = `minihost-${form.serviceName}`
// }
//
// function formatInstanceMode (form, submitForm) {
//   let instance = 1
//   if (form.instanceMode === 'local') {
//   } else if (form.instanceMode === 'cluster') {
//     instance = 2
//   } else {
//     instance = form.instanceNumber
//   }
//   submitForm.instances = instance
// }
//
// function formatContainerSizeMode (form, submitForm) {
//   let ratio = 1
//   let mode = form.containerSizeMode
//   if (mode === 'low') {
//   } else if (mode === 'medium') {
//     ratio = 2
//   } else {
//     ratio = 4
//   }
//   let cpus = 1 * ratio
//   let mem = 1024 * ratio
//   submitForm.cpus = cpus
//   submitForm.mem = mem
// }
//
// function formatSsh (form, submitForm) {
//   submitForm.env.RSA_KEY = form.ssh.join('\n')
// }
//
// function formatPort (form, submitForm) {
//   submitForm.env.PORT = `Port ${form.port}`
// }
