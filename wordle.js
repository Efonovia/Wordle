import { wordleWords, allFiveLetterWords } from './words.js'

const correctWord = wordleWords[Math.floor(Math.random() * wordleWords.length)]
console.log(correctWord)
let keys = document.querySelectorAll('.key')
let tableRows = document.querySelectorAll('tr')
let deleteButton = document.querySelector('.cancel')
let enterButton = document.querySelector('.enter')
let warning = document.querySelector('.warning')
let winScreen = document.querySelector('.win-screen')
let failScreen = document.querySelector('.fail-screen')
document.querySelector('.retry').addEventListener('click', () => location.reload())
document.querySelector('.play-again').addEventListener('click', () => location.reload())

let rowLetters = []
let usedLetters = []
let currentRow = 0


keys.forEach(key => key.addEventListener('click', () => {
    if(rowLetters.length < 5) {
        rowLetters.push(key.textContent)
        usedLetters.push(key.textContent)
        rowLetters.forEach((letter, i) => {
            tableRows[currentRow].children[i].children[0].children[0].textContent = letter
            tableRows[currentRow].children[i].children[0].children[1].textContent = letter
            tableRows[currentRow].children[i].style.borderColor = "red"
            tableRows[currentRow].children[i].children[0].children[0].style.backgroundColor = "black"
        })
    }
    console.log(rowLetters);
    tableRows[currentRow].className = ""
    warning.style.display = 'none'
}))

deleteButton.addEventListener('click', () => {
    rowLetters.pop()
    for(let i = 0; i < 5; i ++) {
        tableRows[currentRow].children[i].children[0].children[0].textContent = rowLetters[i]
        tableRows[currentRow].children[i].children[0].children[1].textContent = rowLetters[i]
        if(tableRows[currentRow].children[i].textContent === "") {
            tableRows[currentRow].children[i].style.borderColor = "rgb(97, 97, 97)"
            tableRows[currentRow].children[i].children[0].children[0].style.backgroundColor = "rgb(37, 37, 37)"
        }
    }
    tableRows[currentRow].className = ""
    warning.style.display = 'none'
    console.log(rowLetters);
})

enterButton.addEventListener('click', () => {
    let userWord = rowLetters.join("")
    let correctWordArr = correctWord.split("")
    if (userWord === correctWord) {
        for(let i = 0; i < 5; i ++) {
            tableRows[currentRow].children[i].children[0].style.transform = "rotateX(180deg)"
            tableRows[currentRow].children[i].children[0].children[1].style.background = "green"
            tableRows[currentRow].children[i].style.borderColor = "green"
        }
        winScreen.style.display = "block"
    }

    if(userWord.length < 5) {
        console.log("Not enough letters")
        tableRows[currentRow].className = "first"
        warning.textContent = "Not enough letters"
        warning.style.display = "flex"
    } else {
        if(allFiveLetterWords.includes(userWord)) {
            for(let i = 0; i < 5; i++) {
                tableRows[currentRow].children[i].style.borderColor = ""
            }

            correctWordArr.forEach((correctWordLetter, i) => {
                if(rowLetters.includes(correctWordLetter)) {
                    if(correctWordLetter === rowLetters[i]) {
                        tableRows[currentRow].children[i].children[0].style.transform = "rotateX(180deg)"
                        tableRows[currentRow].children[i].children[0].children[1].style.background = "green"
                        tableRows[currentRow].children[i].style.borderColor = "green"
                        keys.forEach(key => {
                            if(key.textContent === correctWordLetter) {
                                key.style.background = "green"
                            }
                        })
                    }
                } else {
                    tableRows[currentRow].children[i].children[0].style.transform = "rotateX(180deg)"
                    tableRows[currentRow].children[i].children[0].children[1].style.background = "gray"
                    tableRows[currentRow].children[i].style.borderColor = "gray"
                    
                }
            })

            rowLetters.forEach((rowLetter, i) => {
                if(correctWordArr.includes(rowLetter)) {
                    if(rowLetter !== correctWordArr[i]) {
                        tableRows[currentRow].children[i].children[0].style.transform = "rotateX(180deg)"
                        tableRows[currentRow].children[i].children[0].children[1].style.background = "#ffeb3b"
                        tableRows[currentRow].children[i].style.borderColor = "#ffeb3b"
                        keys.forEach(key => {
                            if(key.textContent === rowLetter) {
                                key.style.background = "#ffeb3b"
                            }
                        })
                    }
                } else {
                    tableRows[currentRow].children[i].children[0].style.transform = "rotateX(180deg)"
                    tableRows[currentRow].children[i].children[0].children[1].style.background = "gray"
                    tableRows[currentRow].children[i].style.borderColor = "gray"
                    keys.forEach(key => {
                        if((usedLetters.includes(rowLetter)) && (key.textContent === rowLetter)) {
                            key.style.background = "gray"
                        }
                    })
                }
            })
            if(currentRow < 5) {
                currentRow += 1
                rowLetters = []
            } else {
                failScreen.style.display = 'block'
                failScreen.children[0].textContent = `Unfortunately You Couldn't Figure out the word. The word was ${correctWord}`
            }
        } else {
            console.log("word is not in word list");
            tableRows[currentRow].className = "first"
            warning.style.display = "flex"
            warning.textContent = "Word is not in word list"
        }
    }
    console.log(userWord);
})