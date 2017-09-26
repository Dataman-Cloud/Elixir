import * as miniform from './form'

export function formatForm (form) {
  let submitForm = miniform.getSubmitForm()
  formatServiceName(form, submitForm)
  formatInstanceMode(form, submitForm)
  formatNetworkMode(form, submitForm)
  formatContainerSizeMode(form, submitForm)
  formatSsh(form, submitForm)
  formatImg(form, submitForm)
  formatPort(form, submitForm)
  formatVolume(form, submitForm)
  formatCMD(form, submitForm)
  return submitForm
}

function formatServiceName (form, submitForm) {
  submitForm.name = `minihost-${form.serviceName}`
}

function formatInstanceMode (form, submitForm) {
  let instance = 1
  if (form.instanceMode === 'local') {
  } else if (form.instanceMode === 'cluster') {
    instance = 2
  } else {
    instance = form.instanceNumber
  }
  submitForm.instances = instance
}

function formatNetworkMode (form, submitForm) {
  submitForm.container.docker.network = form.network
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
  let cpus = 1 * ratio
  let mem = 1024 * ratio
  submitForm.cpus = cpus
  submitForm.mem = mem
}

function formatSsh (form, submitForm) {
  submitForm.env.RSA_KEY = form.ssh.join('\n')
}

function formatImg (form, submitForm) {
  submitForm.container.docker.image = `sryregistry.service.consul:5002/${form.image.Image}:${form.image.tag}`
}

function formatPort (form, submitForm) {
  submitForm.env.PORT = `Port ${form.port}`
}

function formatVolume (form, submitForm) {
  if (form.containerPath && form.hostPath) {
    submitForm.container.volumes = [
      {
        hostPath: form.hostPath,
        containerPath: form.containerPath,
        mode: form.volumeMode
      }
    ]
  }
}

function formatCMD (form, submitForm) {
  submitForm.cmd = form.cmd ? form.cmd : null
}
