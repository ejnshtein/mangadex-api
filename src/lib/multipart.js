module.exports = {
  boundary: () => 'mfa' + Math.floor(Math.random() * 1000).toString(),
  payload: (boundary = 'mfa', obj = {}) => {
    let payload = ''
    for (const i in obj) {
      payload += `--${boundary}\nContent-Disposition: form-data; name="${i}"\n\n${obj[i]}\n`
    }
    payload += `--${boundary}--`
    return payload
  }
}
