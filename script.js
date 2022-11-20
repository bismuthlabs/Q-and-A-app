const quizData = [
    {},
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "JavaScript",
        correct: "c"
    },
    {
        question: "What does CSS stands for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        correct: "b"
    },
    {
        question: "What does HTML stands for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Landuage",
        c: "Hyperloop Machine Language",
        correct: "a"
    },
    {
        question: "Which year was JavaScript launched",
        a: "1996",
        b: "1995",
        c: "1994",
        correct: "b"
    }
]

// DOM Elements selection
const startBtn = document.getElementById('start-btn')
const questionPara = document.querySelector('.question-para')
const currentQuestionNumber = document.querySelector('.current-question')
const answerPara1 = document.getElementById('a-text')
const answerPara2 = document.getElementById('b-text')
const answerPara3 = document.getElementById('c-text')
const option = document.querySelector('.option')
const nav = document.querySelector('.nav-container')
const questionNumberIndicator = document.querySelector('.q-number-indicator')
const totalQuestion = document.querySelector('.total-question')
const endNote = document.querySelector('.end-note')
const scored = document.querySelector('.scored')
const skipBtn = document.getElementById('skip-btn')
const nextBtn = document.getElementById('next-btn')
const answerEl = document.querySelectorAll('.answer')
const input = document.querySelectorAll('input')
const checkoutAnswers = document.querySelector('.check-answers')

// Setting answers to uncheck or deselect
function unchecking() {
    for (i in input) {
        input[i].checked = false
    }
}

// Enabling next button
input.forEach(input => {
    input.addEventListener('click', () => {
        nextBtn.disabled = false
        nextBtn.classList.remove('cursor-no-drop')
    })
})

// Displaying question
function displayQuestion() {
    let num = Number(currentQuestionNumber.innerHTML)
    num++;
    currentQuestionNumber.innerHTML = num
    for (q in quizData) {
        if (q === currentQuestionNumber.innerHTML) {
            questionPara.innerHTML = quizData[q].question
        }
    }
    if (num === quizData.length) {
        questionPara.style.display = 'none'
        endNote.style.display = 'block'
        scored.style.display = 'block'
        option.style.display = 'none'
        questionNumberIndicator.style.display = 'none'
        nav.style.display = 'none'
        checkoutAnswers.style.display = 'flex'
    }
}

// Displaying option
function displayOption() {
    let _num = Number(currentQuestionNumber.innerHTML)
    _num++
    currentQuestionNumber.innerHTML = _num - 1
    for (a in quizData) {
        if (a === currentQuestionNumber.innerHTML) {
            let _a = quizData[a]
            answerPara1.innerHTML = _a.a
            answerPara2.innerHTML = _a.b
            answerPara3.innerHTML = _a.c
        }
    }
}



// Listen to start button
startBtn.addEventListener('click', () => {
    nextBtn.disabled = true
    displayQuestion()
    displayOption()
    totalQuestion.innerHTML = quizData.length - 1
    option.style.display = 'flex'
    startBtn.style.display = 'none'
    nav.style.display = 'flex'
    questionNumberIndicator.style.display = 'inline'
})

// Listen to skip button
skipBtn.addEventListener('click', () => {
    unchecking()
    displayQuestion()
    displayOption()
})

function getSelected() {
    let answer
    answerEl.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

let correctScore = 0

// Listen to next button
nextBtn.addEventListener('click', () => {
    const answer = getSelected()
    if (answer === quizData[Number(currentQuestionNumber.innerHTML)].correct) {
        correctScore++
    }
    scored.innerHTML = `You answered ${correctScore} / ${quizData.length -  1} correctly`
    nextBtn.disabled = true
    nextBtn.classList.add('cursor-no-drop')
    unchecking()
    displayQuestion()
    displayOption()
})