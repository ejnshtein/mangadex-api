export const boundary = (): string =>
  'mfa' + Math.floor(Math.random() * 1000).toString()
export const payload = (boundary = 'mfa', obj = {}): string => {
  let payload = ''
  for (const i in obj) {
    payload += `--${boundary}\nContent-Disposition: form-data; name="${i}"\n\n${obj[i]}\n`
  }
  payload += `--${boundary}--`
  return payload
}
