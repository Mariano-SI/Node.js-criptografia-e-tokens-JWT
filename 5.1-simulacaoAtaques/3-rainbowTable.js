import {createHash} from "crypto";

const hashesVazadas = ["21232f297a57a5a743894a0e4a801fc3",
"cedf5ab7b5c5852b3ed35d7dbe3c3835",
"81dc9bdb52d04dc20036dbd8313ed055"];

function criaHash(dado, estrategia){
    return createHash(estrategia).update(dado).digest('hex');
}

const senhasComuns = ["senha", "123456", "senha123", "admin", "blink182","meuAniversario", "senha123456", "brasil", "102030", "1234"];

const rainbowTable = senhasComuns.map((senhaComum) => [senhaComum, criaHash(senhaComum, 'md5')]);

console.log(rainbowTable);


for (const hashVazada of hashesVazadas) {
    for (const rainBowHash of rainbowTable) {
        if(hashVazada === rainBowHash[1]){
            console.log(`A senha da hash ${hashVazada} é ${rainBowHash[0]}`)
        }
    }
}
