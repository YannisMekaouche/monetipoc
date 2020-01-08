const crypto = require('crypto')

const strSplit = (string, splitLength) => {
  if (splitLength === null) {
    splitLength = 1
  }
  if (string === null || splitLength < 1) {
    return false
  }

  string += ''
  var chunks = []
  var pos = 0
  var len = string.length

  while (pos < len) {
    chunks.push(string.slice(pos, pos += splitLength))
  }

  return chunks
}

export const signHmacSha1 = (key, str) => {
  const hmac = crypto.createHmac('sha1', key)
  const signed = hmac.update(Buffer.from(str, 'utf-8')).digest('hex')

  return signed
}

export const base64Encode = (str) => {
  const buffer = Buffer.from(str)

  return buffer.toString('base64')
}

export const generateOperationalHmac = (sk) => {
  const secretSplits = strSplit(sk, 2)

  secretSplits.forEach((v, index) => {
    secretSplits[index] = String.fromCharCode(parseInt(v, 16))
  })

  return secretSplits.join('')
}

export const generateRandomString = (length) => {
  var result = ''
  const characters = '0123456789'
  const charactersLength = characters.length

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}
