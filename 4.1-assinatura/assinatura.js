import {generateKeyPairSync, createSign, createVerify} from "crypto";

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

let dados = "Essa frase vai ser assinada";

//Assinatura

const assinador = createSign('rsa-sha256');

assinador.update(dados);

const assinatura = assinador.sign(privateKey, 'hex');

console.log('Assinatura: ', assinatura);

//Intermediario que altera os dados
//dados = "Arquivo alterada"


//Envio do documento. Ela recebe o docuemnto, a assinatura e a chave publica para desencriptar e comparar

const verificador = createVerify('rsa-sha256');

verificador.update(dados);

const ehVerificado = verificador.verify(publicKey, assinatura, 'hex');

console.log(ehVerificado);

