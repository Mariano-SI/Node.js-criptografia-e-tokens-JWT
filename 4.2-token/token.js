import jwt from "jsonwebtoken";

//chave secreta
const secretKey = "chaveSuperSecreta";

const token = jwt.sign({
    apelido: "Mari",
    curso: "Sistemas de Informação",
}, secretKey);

console.log(token);

const decodedToken = jwt.verify(token, secretKey);

console.log(decodedToken);