const readline = require('readline');
const stringComposer = require('./word-composer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const recursiveQuestion = () => {
    rl.question('Digite as letras disponíveis nessa jogada: ', (aswer)=>{
        const string = stringComposer(aswer);
        console.log(`${string} \n`);
        
        recursiveQuestion();
    });
    
}

recursiveQuestion();