/*
    A lógica usada foi receber uma string com os caracteres digitados, usar a função (normalizeWord) que remove os acentos e transforma a string em um array, separando os
     caracteres.
    Após isso, uso o loop for para percorrer o array de palavras (words-db.js), para cada palavra, eu usei novamente a função (normalizeWord) para remover os acentos e separar 
    em um array cada caractere.
    
*/

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