import { createHash } from "crypto";

function generateHash(password){
    return createHash('sha256').update(password).digest('hex');
}

console.log(generateHash('Mariano'));


class User{
    constructor(name, password){
        this.name = name;
        this.password = generateHash(password);
    }

    
    authenticate(name, password){
        if(name === this.name && this.password === generateHash(password)){
            console.log('Usuário cadastrado com sucesso');
            return true;
        }
        console.log('Usuário ou senha incorretos');
        return false;
    }
}

const testUser = new User('Mariano', 'Mariano12345');

console.log(testUser)

testUser.authenticate('Mariano', 'SenhaIncorreta');
testUser.authenticate('Mariano', 'Mariano12345');