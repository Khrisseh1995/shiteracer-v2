import randomWords from 'random-words'
 
const generateWords = () => {
    const randoms = randomWords({ exactly: 30 })
    //@ts-ignore
    let splitWords  = randoms.map((x: string) => {
        return x.split("").map((y: string) => {
            return y;
        });
    });

    splitWords.forEach((x: Array<string>) => {
        x.push(" ");
    });
    
    return {
        splitWords: splitWords.flat(1),
        displayWords: randoms
    };
}

export {
    generateWords
}
