const questions = [
    {
        question: "¿Qué es una variable en programación?",
        answers: [
            { text: "Un espacio en memoria para almacenar datos", correct: true },
            { text: "Una función que realiza una tarea específica", correct: false },
            { text: "Un tipo de dato que representa texto", correct: false },
            { text: "Una estructura de control de flujo", correct: false }
        ]
    },
    {
        question: "¿Cuál es la estructura correcta de un condicional 'if' en JavaScript?",
        answers: [
            { text: "if condición { código }", correct: false },
            { text: "if (condición) código", correct: false },
            { text: "if condición: código", correct: false },
            { text: "if (condición) { código }", correct: true }
        ]
    },
    {
        question: "¿Qué es un bucle 'for'?",
        answers: [
            { text: "Una estructura que repite un bloque de código un número específico de veces", correct: true },
            { text: "Una función que se ejecuta al cumplirse una condición", correct: false },
            { text: "Un tipo de variable que almacena múltiples valores", correct: false },
            { text: "Una declaración que detiene la ejecución de un programa", correct: false }
        ]
    },
    {
        question: "¿Qué es una función en programación?",
        answers: [
            { text: "Un bloque de código que realiza una tarea específica y puede ser llamado múltiples veces", correct: true },
            { text: "Una variable que almacena datos", correct: false },
            { text: "Una estructura de control que evalúa condiciones", correct: false },
            { text: "Un tipo de dato que representa números", correct: false }
        ]
    },
    {
        question: "¿Qué es un arreglo (array) en programación?",
        answers: [
            { text: "Una colección de elementos del mismo tipo almacenados en posiciones contiguas de memoria", correct: true },
            { text: "Una variable que almacena un único valor", correct: false },
            { text: "Una función que devuelve múltiples valores", correct: false },
            { text: "Una estructura de control que permite la iteración", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Función para iniciar el quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultContainer.classList.add('hide');
    showQuestion();
}

// Función para mostrar una pregunta
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Función para limpiar el estado antes de mostrar la siguiente pregunta
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Función para manejar la selección de respuesta
function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Deshabilitar todos los botones después de seleccionar
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
    });

    nextButton.classList.remove('hide');
}

// Función para manejar el botón "Siguiente"
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Función para mostrar el resultado final
function showResult() {
    questionElement.innerText = "¡Quiz finalizado!";
    resultElement.innerText = `Obtuviste ${score} de ${questions.length} respuestas correctas.`;
    resultContainer.classList.remove('hide');
    answerButtonsElement.innerHTML = "";
    nextButton.classList.add('hide');
}

// Función para reiniciar el quiz
restartButton.addEventListener('click', startQuiz);

// Iniciar el quiz cuando la página carga
startQuiz();
