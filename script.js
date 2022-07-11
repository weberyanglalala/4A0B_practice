const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')
const showAnswerBtn = document.querySelector('#showAnswer')
const guess = document.querySelector('#guess')
const guessBtn = document.querySelector('#guessBtn')
const recordGroup = document.querySelector('.record-group')
const hint = document.querySelector('.hint')
let goal = GenerateGoal()
let guessToIntArr = []
GameInitialize()
guessBtn.addEventListener('click', () => {
  if (CheckValid()) CheckAnswer(guess['value'], goal)
})
startBtn.addEventListener('click', () => {
  ResetGame()
})
resetBtn.addEventListener('click', () => {
  GameInitialize()
  ShowHint(goal.join(""))
})
showAnswerBtn.addEventListener('click', () => {
  ShowHint(goal.join(""))
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
  let validWords = []
  let input = [...guess.value].reduce((a, b) => {
    if (!a.includes(b)) a.push(b)
    return a
  }, [])
  if (/\s/.test(guess['value'])) {
    ShowHint('輸入字數含有空白字元')
    guess.value = ""
    return false
  }
  if (guess.value.length !== 4) {
    ShowHint('數入字數長度不為 4')
    guess.value = ""
    return false
  }
  if (input.length !== 4) {
    ShowHint('輸入字重複')
    guess.value = ""
    return false
  }
  input.forEach(element => {
    if (!Number.isInteger(Number(element))) {
      validWords.push(element)
    }
  })
  if (validWords.length > 0) {
    ShowHint(`${validWords} 不是數字`)
    guess.value = ""
    return false
  }
  else {
    return true
  }
}
function CheckAnswer(guessing, answer) {
  RemoveHint()
  let input = [...guessing].map(char => Number(char))
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
    DisplayRecord(`${A}A${B}B`, 'badge-success', `${guessing}`)
    guess['value'] = ""
    GameInitialize()
  }
  else {
    DisplayRecord(`${A}A${B}B`, 'badge-wrong', `${guessing}`)
  }
}
function DisplayRecord(badge, badgeClass, input) {
  recordGroup.innerHTML +=
    `<div class="record">
            <span class="badge ${badgeClass}">${badge}</span>
            <span class="guess">${input}</span>
        </div>`
}
function ResetGame() {
  resetBtn.classList.remove("btn-disabled")
  showAnswerBtn.classList.remove("btn-disabled")
  guess.classList.remove("btn-disabled")
  guessBtn.classList.remove("btn-disabled")
  startBtn.classList.add('btn-disabled')

  RemoveHint()

  recordGroup.innerHTML = ""
  guess.value = ""

  goal = GenerateGoal()
  guessToIntArr = []
}
function GameInitialize() {
  startBtn.classList.remove('btn-disabled')
  resetBtn.classList.add("btn-disabled")
  showAnswerBtn.classList.add("btn-disabled")
  guess.classList.add("btn-disabled")
  guessBtn.classList.add("btn-disabled")
  RemoveHint()
}
function ShowHint(msg) {
  hint.innerHTML =
    `<div class="record hint-msg">
        <span class="badge">HINT</span>
        <span class="guess">${msg}</span>
    </div>`
}
function RemoveHint() {
  if (hint.hasChildNodes()) hint.removeChild(document.querySelector('.hint-msg'))
}