import { createHash } from "crypto";

class User{
    constructor(name, password){
        this.name = name;
        this.password = this.generateHash(password);
    }

    generateHash(password){
        return createHash('sha256').update(password).digest('hex');
    }
    
    authenticate(name, password){
        if(name === this.name && this.password === this.generateHash(password)){
            console.log('Usuário autenticado com sucesso');
            return true;
        }
        //console.log('Usuário ou senha incorretos');
        return false;
    }
}

//Supondo que so senhas numericas de 4 digitos sao permitidas
const testUser = new User('Mariano', 'senha123');

// código omitido

const senhasComuns = ["senha", "123456", "senha123", "admin", "blink182","meuAniversario", "senha123456", "brasil", "102030"]

for (const senhaComum of senhasComuns) {
    if(testUser.authenticate('Mariano', senhaComum)){
        console.log(`A senha do usuário é ${senhaComum}`)
    }
}