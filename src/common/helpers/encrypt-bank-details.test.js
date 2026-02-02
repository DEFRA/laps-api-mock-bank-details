import { describe, it, expect } from 'vitest'
import crypto from 'crypto'
import {
  base64ToUrlBase64,
  getAlgorithmForKey,
  encryptBankDetails
} from './encrypt-bank-details.js'

describe('encrypt-bank-details utilities', () => {
  describe('base64ToUrlBase64', () => {
    it('converts standard Base64 to URL-safe Base64', () => {
      const standard = 'SGVsbG8gV29ybGQtX19f'
      const urlSafe = base64ToUrlBase64(standard)
      expect(urlSafe).toBe('SGVsbG8gV29ybGQtX19f')
    })

    it('replaces + with -', () => {
      expect(base64ToUrlBase64('a+b')).toBe('a-b')
    })

    it('replaces / with _', () => {
      expect(base64ToUrlBase64('a/b')).toBe('a_b')
    })
  })

  describe('getAlgorithmForKey', () => {
    it('returns aes-128-cbc for 16-byte key', () => {
      const key = Buffer.alloc(16)
      expect(getAlgorithmForKey(key)).toBe('aes-128-cbc')
    })

    it('returns aes-256-cbc for 32-byte key', () => {
      const key = Buffer.alloc(32)
      expect(getAlgorithmForKey(key)).toBe('aes-256-cbc')
    })

    it('throws error for invalid key length', () => {
      const key = Buffer.alloc(24)
      expect(() => getAlgorithmForKey(key)).toThrow(
        'Invalid key length: must be 16 or 32 bytes, got 24'
      )
    })
  })

  describe('encryptBankDetails', () => {
    it('encrypts data and returns URL-safe Base64 format', () => {
      const plaintext = JSON.stringify({
        account: '12345',
        sortCode: '11-22-33'
      })
      const key = crypto.randomBytes(32)
      const keyB64 = key.toString('base64')

      const encrypted = encryptBankDetails(plaintext, keyB64)

      // Should be in format: <IV_BASE64URL>==<CIPHERTEXT_BASE64URL>
      expect(encrypted).toMatch(/^[A-Za-z0-9_-]+==/)
      expect(encrypted.length).toBeGreaterThan(20)
    })

    it('throws error when encryption key is invalid', () => {
      const plaintext = 'test data'
      const invalidKey = 'notBase64!'

      expect(() => encryptBankDetails(plaintext, invalidKey)).toThrow()
    })

    it('generates different ciphertext for same plaintext (due to random IV)', () => {
      const plaintext = 'test data'
      const key = crypto.randomBytes(32)
      const keyB64 = key.toString('base64')

      const encrypted1 = encryptBankDetails(plaintext, keyB64)
      const encrypted2 = encryptBankDetails(plaintext, keyB64)

      // Should be different due to random IV
      expect(encrypted1).not.toBe(encrypted2)
    })

    it('produces properly formatted IV and ciphertext parts', () => {
      const plaintext = 'test data'
      const key = crypto.randomBytes(32)
      const keyB64 = key.toString('base64')

      const encrypted = encryptBankDetails(plaintext, keyB64)

      // Extract parts
      const match = encrypted.match(/^([A-Za-z0-9_-]+==)([A-Za-z0-9_-]+=*)$/)
      expect(match).toBeTruthy()
      expect(match[1]).toHaveLength(24) // IV is 16 bytes -> 24 chars in Base64
      expect(match[2].length).toBeGreaterThan(0)
    })
  })
})
