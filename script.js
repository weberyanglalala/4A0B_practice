const start = document.querySelector('#start')
const reset = document.querySelector('#reset')
const showAnswer = document.querySelector('#showAnswer')
const guess = document.querySelector('#guess')
const guessBtn = document.querySelector('#guessBtn')
const recordGroup = document.querySelector('.record-group')
let goal = GenerateGoal()
let guessToIntArr = []
console.log(goal)
guessBtn.addEventListener('click', () => {
    guessToIntArr = [...guess['value']].map(num => Number(num))
    if (CheckValid()) CheckAnswer(guessToIntArr, goal)
})

function GenerateGoal() {
    let num = 0
    const result = []
    while (result.length < 4) {
        num = Math.floor(Math.random() * (10))
        if (result.includes(num)) {
            continue
        }
        else {
            result.push(num)
        }
    }
    return result
}
function CheckValid() {
    let validIndex = []
    let input = [...guess.value].reduce((a, b) => {
        if (!a.includes(b)) a.push(b)
        return a
    }, [])

    if (guess.value.length !== 4) {
        console.log('數入字數長度不為 4')
        return false
    }
    if (input.length !== 4) {
        console.log('輸入數字重複')
        return false
    }
    input.forEach(element => {
        if (!Number.isInteger(Number(element))) {
            validIndex.push(element)
        }
    })
    if (validIndex.length > 0) {
        console.log(`第 ${validIndex.join("、", validIndex)} 字不是數字`)
        return false
    }
    else {
        return true
    }
}
function CheckAnswer(input, answer) {
    let guessFormat = input.reduce((a, b) => a.concat(b), '')
    let arrB = []
    let A = 0;
    let B = 0;
    answer.forEach(num => {
        if (input.includes(num)) arrB.push(num)
    })
    arrB.forEach(num => {
        if (answer.indexOf(num) === input.indexOf(num)) A++
    })
    B = arrB.length - A

    if (A == 4) {
        DisplayRecord(`${A}A${B}B`, 'badge-success',`${guessFormat}`)
    }
    else {
        DisplayRecord(`${A}A${B}B`, 'badge-wrong',`${guessFormat}`)
    }
    
}
function DisplayRecord(badge, badgeClass,input) {
    recordGroup.innerHTML +=
        `<div class="record">
            <span class="badge ${badgeClass}">${badge}</span>
            <span class="guess">${input}</span>
        </div>`
}
