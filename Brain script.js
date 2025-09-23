document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const questionText = document.getElementById('question');
    const answerText = document.getElementById('answer');

    const flashcardsData = [
        { question: "What is HTML?", answer: "The language for structuring web pages." },
        { question: "What is CSS?", answer: "The language for styling web pages." },
        { question: "What is JavaScript?", answer: "The language for making web pages interactive." }
    ];

    let currentCardIndex = 0;

    function showCard(index) {
        questionText.textContent = flashcardsData[index].question;
        answerText.textContent = flashcardsData[index].answer;
        flashcard.classList.remove('flipped');
    }

    showAnswerBtn.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
        showCard(currentCardIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
        showCard(currentCardIndex);
    });

    // Initialize with the first card
    showCard(currentCardIndex);
});