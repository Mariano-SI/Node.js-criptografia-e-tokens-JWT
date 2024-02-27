/* 
A utilização de um "salt" na hora de armazenar senhas é uma prática recomendada por especialistas em segurança da informação por várias razões:

1 - Proteção contra ataques de dicionário e rainbow tables: Sem um salt, um invasor pode pré-computar o hash de valores comuns de senha (ou todas as possíveis senhas, se a senha for curta o suficiente) e simplesmente procurar o hash resultante. Com um salt, eles teriam que fazer isso para cada salt possível, o que torna o ataque impraticável se o salt for longo o suficiente.

2 - Torna cada hash único: Mesmo que duas pessoas usem a mesma senha, os hashes serão diferentes devido ao salt diferente usado em cada caso. Isso impede que um invasor saiba que duas pessoas estão usando a mesma senha apenas olhando para os hashes.

3 - Adiciona complexidade ao processo de cracking: Como o salt é adicionado à senha antes do hashing, ele efetivamente aumenta a complexidade da senha, tornando-a mais difícil de ser quebrada por força bruta. */
import {scryptSync, randomBytes, timingSafeEqual} from "crypto"; 

function generateHashWithSalt(password){
    const salt =  randomBytes(16).toString('hex'); //gera uma sequencia alfanumerica aleatoria que cabe na quantidade de bytes passada

    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    return `${salt}:${hashedPassword}`;
}

class User{
    constructor(name, password){
        this.name = name;
        [this.salt, this.password] = generateHashWithSalt(password).split(':'); //Quando utilizamos estrategias de salt devemos armazenar no bd a senha hasheada e o salt que foi gerado, caso optemos por salts unicos(+ recomendado)
        
    }

    authenticate(name, password){
        if(name === this.name){
            const hashTest = scryptSync(password, this.salt, 64);
            const hashReal = Buffer.from(this.password, 'hex');

            const equalHashes = timingSafeEqual(hashTest, hashReal);

            if(equalHashes){
                console.log('Usuário autenticado com sucesso');
                return true;
            }
        }
        console.log('Usuário ou senha incorretos');
        return false;
    }
}

const testUser = new User('Mariano', 'senhaSecreta');
console.log(testUser);

//sucess case
testUser.authenticate('Mariano', 'senhaSecreta');

//fail case
testUser.authenticate('Mariano', 'senhaErrada');

//fail case capitalize error
testUser.authenticate('Mariano', 'senhasecreta');