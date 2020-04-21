// docs: https://nodejs.org/dist/latest-v10.x/docs/api/https.html#https_https_request_url_options_callback
// all methods working, but post only with x-form-urlencoded. return promise with resolved object on line 64.
// extra options parameters: json=[bool], params=[object]
// const qs = require('querystring')
const https = require('https')
const http = require('http')
const cleanObject = (object, filterKeys) => {
  const obj = Object.create({})
  for (const [key, val] of Object.entries(object)) {
    if (filterKeys.includes(key)) {
      obj[key] = val
    }
  }
  return obj
}

const mergeUrl = (url, searchParams) => {
  const urlInst = new URL(url)
  const params = new URLSearchParams(searchParams)
  params.forEach((val, key) => {
    urlInst.searchParams.set(key, val)
  })
  return urlInst.toString()
}

/**
 *
 * @param {string} url Url for request
 * @param {object} options Request options
 * @param {object} [formData] Request formdata
 */
function request (url, options, formData) {
  if (options.params && typeof options.params === 'object') {
    url = mergeUrl(url, options.params)
  }
  if (options.headers && formData) {
    options.headers = Object.assign(options.headers, { 'Content-Length': Buffer.byteLength(formData) })
  }
  if (options.headers && !options.headers['User-Agent']) {
    options.headers = Object.assign(options.headers, {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) snap Chromium/78.0.3904.70 Chrome/78.0.3904.70 Safari/537.36'
    })
  }
  return new Promise((resolve, reject) => {
    function resHandler (res) {
      if (options.responseType === 'stream') {
        return resolve(res)
      }

      res.setEncoding('utf8')
      let data = ''

      const onData = chunk => {
        data += chunk
      }
      const onError = err => {
        res.removeListener('error', onError)
        res.removeListener('data', onData)
        reject(err)
      }
      const onClose = () => {
        res.removeListener('error', onError)
        res.removeListener('data', onData)
        res.removeListener('close', onClose)

        if (res.statusCode !== 200) {
          return reject(new Error(`${res.statusCode} - ${res.statusMessage}\n${url}\nOptions: ${JSON.stringify(options)}\n\n${data}`))
        }

        if (options.json) {
          try {
            data = JSON.parse(data)
          } catch (e) {
            return reject(new Error(`JSON parsing error: ${e.message}: ${data}`))
          }
        }
        resolve({
          data,
          headers: res.headers,
          status: res.statusCode,
          statusText: res.statusMessage
        })
        data = null
      }
      res.on('data', onData)
      res.on('error', onError)
      res.on('close', onClose)
    }
    const req = url.startsWith('https') ? https.request(
      url,
      cleanObject(options, ['protocol', 'host', 'hostname', 'family', 'port', 'localAddres', 'socketPath', 'method', 'path', 'auth', 'agent', 'createConnection', 'timeout']),
      resHandler
    ) : http.request(
      url,
      cleanObject(options, ['protocol', 'host', 'hostname', 'family', 'port', 'localAddres', 'socketPath', 'method', 'path', 'auth', 'agent', 'createConnection', 'timeout']),
      resHandler
    )
    if (options.headers) {
      Object.entries(options.headers)
        .forEach(([name, value]) => {
          req.setHeader(name, value)
        })
    }
    const onError = err => {
      req.removeListener('error', onError)
      reject(err)
    }
    req.on('error', onError)
    if (formData) {
      req.write(formData)
    }
    req.end()
  })
}

module.exports = request
