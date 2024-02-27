import {generateKeyPairSync, publicEncrypt, privateDecrypt} from "crypto";

const {privateKey, publicKey} = generateKeyPairSync('rsa',  {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    }
});

//Encriptar a informação, temos acesso a chave publica e a informcacao que queremos transmitir

const dadosCriptografados = publicEncrypt(
    publicKey,
    Buffer.from("Mensagem super secreta")
);

//Recepcao da informação. Aqui possuimos uma chave privada para desencriptar

const dadosDecifrados = privateDecrypt(privateKey, dadosCriptografados);

console.log('Mensagem decifrada: ', dadosDecifrados.toString('utf-8'));

