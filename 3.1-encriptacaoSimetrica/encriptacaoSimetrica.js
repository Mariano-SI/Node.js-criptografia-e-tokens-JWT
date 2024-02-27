import {createCipheriv, randomBytes, createDecipheriv } from "crypto";
//Encriptacao simetrica é uma estrategia de criptografica onde o transmissor e o receptor sabem cifrar e decifrar uma mensagem. Ou seja os paramtros sao compartilhados entre eles

const mensagem = 'Testing Message';

const chave = randomBytes(32);
const vi = randomBytes(16); //inicialization vector

const cifra = createCipheriv('aes256', chave, vi);

const mensagemCifrada = cifra.update(mensagem, 'utf-8', 'hex') + cifra.final('hex');

console.log('Encriptada ', mensagemCifrada);

//simulando  transmissao ------------------------------------------------------------

const decifra = createDecipheriv('aes256', chave, vi);

const mensagemDecifrada = decifra.update(mensagemCifrada, 'hex', 'utf-8') + decifra.final('utf-8');

console.log('Desencriptada ', mensagemDecifrada);

