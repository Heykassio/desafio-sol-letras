const readline = require('readline');
const stringComposer = require('./word-composer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let letters = '';
let bonus = '';

const questionLetter = () =>{
    return new Promise((resolve, rej)=>{
        rl.question('Digite as letras disponíveis nessa jogada: ', (aswer)=>{
            letters = aswer;
            resolve();
        });
    });
}

const questionPosition = () =>{
    return new Promise((resolve, rej) =>{
        rl.question('Digite a posição bônus: ', (aswer)=>{
            bonus = aswer;
            resolve();
        });
    });
}

const recursiveQuestion = async () => {
    await questionLetter();
    await questionPosition();
    const string = stringComposer(letters, bonus);
    console.log(string);
    recursiveQuestion();   
}

recursiveQuestion();