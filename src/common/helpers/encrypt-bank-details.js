import crypto from 'crypto'

/**
 * Convert standard Base64 to URL-safe Base64
 * @param {string} str - Standard Base64 string
 * @returns {string} URL-safe Base64 string
 */
export function base64ToUrlBase64(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_')
}

/**
 * Determine the AES algorithm based on key length
 * @param {Buffer} key - The encryption key
 * @returns {string} Algorithm string ('aes-128-cbc' or 'aes-256-cbc')
 * @throws {Error} If key length is invalid
 */
export function getAlgorithmForKey(key) {
  if (key.length === 16) {
    return 'aes-128-cbc'
  } else if (key.length === 32) {
    return 'aes-256-cbc'
  } else {
    throw new Error(
      `Invalid key length: must be 16 or 32 bytes, got ${key.length}`
    )
  }
}

/**
 * Encrypt bank details data
 * @param {string} plaintext - Data to encrypt (as string or JSON stringified)
 * @param {string} encryptionKey - Base64-encoded encryption key
 * @returns {string} Encrypted response in format: <IV_BASE64URL>==<CIPHERTEXT_BASE64URL>
 * @throws {Error} If encryption fails or key is invalid
 */
export function encryptBankDetails(plaintext, encryptionKey) {
  // Decode and validate key
  const key = Buffer.from(encryptionKey, 'base64')
  const algorithm = getAlgorithmForKey(key)

  // Generate random IV
  const iv = crypto.randomBytes(16)

  // Encrypt
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(plaintext)
  encrypted = Buffer.concat([encrypted, cipher.final()])

  // Convert to URL-safe Base64 and format as: <IV>==<CIPHERTEXT>
  const ivB64Url = base64ToUrlBase64(iv.toString('base64'))
  const cipherB64Url = base64ToUrlBase64(encrypted.toString('base64'))

  return ivB64Url + cipherB64Url
}
