import * as crypto from 'crypto';

// Key และ IV สำหรับการเข้ารหัส (ควรเก็บใน ENV)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'abcdefghijklmnop'; // 16 bytes
const IV = process.env.IV || '1234567890123456'; // 16 bytes

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv('aes-128-cbc', ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv('aes-128-cbc', ENCRYPTION_KEY, IV);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}