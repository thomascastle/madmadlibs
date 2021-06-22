const generatePhrase = async (words: string[]) => {
    let phrase = ''
    const allWordTypes = ["adjective", "adverb", "animal", "bodyPart", "gerund", "noun", "pluralNoun", "verb"]

    for (let i = 0; i < words.length; i++) {
        const word = words[i]

        if (word === "" || (word === "a" && i === 0)) continue
        if (word.slice(0, 1) === "$") {
            if (!allWordTypes.includes(word.slice(1))) {
                throw new Error("Word type not found")
            }
            else {
                const filePath = word.slice(1) + "s.txt"
                phrase += getRandomWord(await getWordFileContent(filePath)) + " "
            }
        } else {
            phrase += word + " "
        }
    }
    return phrase.slice(0, -1)
}

const getRandomWord = (contents: string) => {
    const _contents: string = contents.replace(/[\r]/g, "")
    const words = _contents.split("\n")
    const i = Math.floor(Math.random() * words.length)

    words.pop()

    return words[i]
}

const getWordFileContent = async (wordType: string) => {
    const file = await fetch(`${process.env.APP_URL}/db/${wordType}`)
    const text = await file.text()

    return text
}

const isVowel = (phrase: string) => new RegExp(/[aeiou]/gi).test(phrase[0])

export const resolvePhrase = async (query: string) => {
    const words = query.split(" ")
    let phrase = await generatePhrase(words)

    if (words[0] === 'a') {
        phrase = isVowel(phrase) ? "an" : "a" + " " + phrase
    }
    return phrase
}
