const words = require('../words-db');
const pointsrules = require('../points-rules');

function normalizeWord(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase().split('');
}

function findWord(letterArray, wordArray) {
    const letterArrayAux = [...letterArray];
    const wordArrayAux = [...wordArray];
    let points = 0;
    for(let i = 0; i < wordArray.length; i++) {
        if(!letterArrayAux.includes(wordArray[i])) break;
        letterArrayAux.splice(letterArrayAux.indexOf(wordArray[i]), 1);
        wordArrayAux.shift();
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

function find(lettersString) {
    const letterArray = normalizeWord(lettersString);
    const results = [];
    let rest;
    for(let i = 0; i < words.length; i++) {
        const wordArray = normalizeWord(words[i]);
        const result = findWord(letterArray, wordArray);
        if(result) {
            const word = [];
            let points = result.points;
            word.push(words[i]);
            rest = [...result.rest];
            if(rest.length > 1) {
                for(let j = 0; j < words.length; j++) {
                    const wordArray = normalizeWord(words[j]);
                    const resultRest = findWord(rest, wordArray);
                    if(resultRest) {
                        word.push(words[j]);
                        points += resultRest.points;
                        rest = '';
                        rest = [...resultRest.rest];
                    }
                }
            }
            results.push({...result, rest, points, word});
        }
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

    if(!bestWord.word.length === 0) {
        string = `\nNenhuma palavra encontrada\n`
    }else{
        let wordString = '';
        if(bestWord.word.length > 1) {
            bestWord.word.forEach(word=>{
                wordString += `${word}, `
            });
        }else{
            wordString = `${bestWord.word[0]}, `
        }

        string = `\n${wordString}total de ${bestWord.points} pontos\n`;
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