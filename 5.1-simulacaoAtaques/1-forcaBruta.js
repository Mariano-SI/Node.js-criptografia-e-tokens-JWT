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
const testUser = new User('Mariano', '1234');

for(let senhaTeste = 0; senhaTeste < 10000; senhaTeste++){
    if(testUser.authenticate('Mariano', senhaTeste.toString())){
        console.log(`A senha do usuário é ${senhaTeste}`);
    }
}