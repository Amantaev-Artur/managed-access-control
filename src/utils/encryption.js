import forge from 'node-forge';

const decryptData = (encryptedBase64) => {
  const privateKeyPem = localStorage.getItem('privKey');

  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const encryptedBytes = forge.util.decode64(encryptedBase64);
  const decrypted = privateKey.decrypt(encryptedBytes);

  return decrypted;
}

const encryptData = (data) => {
  const publicKeyPem = localStorage.getItem('pubKey');

  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedBytes = publicKey.encrypt(data);
  const encrypted = forge.util.encode64(encryptedBytes)

  return encrypted;
}

export { decryptData, encryptData };