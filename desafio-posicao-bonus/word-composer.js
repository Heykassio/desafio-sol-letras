const words = require('../words-db');
const pointsrules = require('../points-rules');

function normalizeWord(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase().split('');
}

function findWord(letterArray, wordArray, bonusPosition) {
    const letterArrayAux = [...letterArray];
    const wordArrayAux = [...wordArray];
    let points = 0;
    for(let i = 0; i < wordArray.length; i++) {
        if(!letterArrayAux.includes(wordArray[i])) break;
        letterArrayAux.splice(letterArrayAux.indexOf(wordArray[i]), 1);
        wordArrayAux.shift();

        if(bonusPosition != 0 && bonusPosition-1 === i){
            points += pointsrules[wordArray[i]];
        }
        points += pointsrules[wordArray[i]];
        if(wordArrayAux.length === 0) {
            return {
                result: true,
                rest: letterArrayAux,
                points
            }
        }
    }

}

function find(lettersString, bonusPosition) {
    const letterArray = normalizeWord(lettersString);
    const results = [];
    for(let i = 0; i < words.length; i++) {
        const wordArray = normalizeWord(words[i]);
        const result = findWord(letterArray, wordArray, bonusPosition);
        if(result) results.push({...result, word: words[i]});
    }
    
    const bestWord = results.reduce((value, ac)=>{
        return value.points > ac.points ? value : ac;
    }, {});

    if(!bestWord.word) {
        return {
            word: '',
            rest: letterArray,
            points: 0
        }
    }
    return bestWord;
}

function stringComposer(lettersString, bonusPosition) {
    const bestWord = find(lettersString, Number(bonusPosition));
    let string = '\n';

    if(!bestWord.word) {
        string = `\nNenhuma palavra encontrada\n`
    }else{
        string = `\n${bestWord.word}, palavra de ${bestWord.points} pontos\n`;
    }

    if(bestWord.rest.length > 0) {
        string += `Sobraram: `
        for(let i = 0; i < bestWord.rest.length; i++) {
            if(i === (bestWord.rest.length - 1)) {
                string += ` ${bestWord.rest[i]}\n`;
            }else {
                string += ` ${bestWord.rest[i]},`
            }
        }
    }

    return string;
}

module.exports = stringComposer;