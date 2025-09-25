document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const flashcard = document.getElementById('flashcard');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const questionText = document.getElementById('question');
    const answerText = document.getElementById('answer');
    const addCardBtn = document.getElementById('addCardBtn');
    const editCardBtn = document.getElementById('editCardBtn');
    const deleteCardBtn = document.getElementById('deleteCardBtn');
    const cardForm = document.getElementById('cardForm');
    const flashcardForm = document.getElementById('flashcardForm');
    const formTitle = document.getElementById('formTitle');
    const questionInput = document.getElementById('questionInput');
    const answerInput = document.getElementById('answerInput');
    const cancelBtn = document.getElementById('cancelBtn');

    // Initialize flashcards from localStorage or use default cards
    let flashcardsData = JSON.parse(localStorage.getItem('flashcards')) || [
        { question: "What is HTML?", answer: "The language for structuring web pages." },
        { question: "What is CSS?", answer: "The language for styling web pages." },
        { question: "What is JavaScript?", answer: "The language for making web pages interactive." }
    ];

    let currentCardIndex = 0;
    let isEditing = false;

    // Functions
    function saveToLocalStorage() {
        localStorage.setItem('flashcards', JSON.stringify(flashcardsData));
    }

    function showCard(index) {
        if (flashcardsData.length === 0) {
            questionText.textContent = "No flashcards available.";
            answerText.textContent = "Add a new card to get started!";
            editCardBtn.disabled = true;
            deleteCardBtn.disabled = true;
            return;
        }

        questionText.textContent = flashcardsData[index].question;
        answerText.textContent = flashcardsData[index].answer;
        flashcard.classList.remove('flipped');
        editCardBtn.disabled = false;
        deleteCardBtn.disabled = false;
    }

    function toggleForm(show, mode = 'add') {
        cardForm.classList.toggle('hidden', !show);
        if (show) {
            isEditing = mode === 'edit';
            formTitle.textContent = isEditing ? 'Edit Flashcard' : 'Add New Flashcard';
            if (isEditing) {
                questionInput.value = flashcardsData[currentCardIndex].question;
                answerInput.value = flashcardsData[currentCardIndex].answer;
            } else {
                questionInput.value = '';
                answerInput.value = '';
            }
            questionInput.focus();
        }
    }

    // Event Listeners
    showAnswerBtn.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    nextBtn.addEventListener('click', () => {
        if (flashcardsData.length > 0) {
            currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
            showCard(currentCardIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (flashcardsData.length > 0) {
            currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
            showCard(currentCardIndex);
        }
    });

    addCardBtn.addEventListener('click', () => {
        toggleForm(true, 'add');
    });

    editCardBtn.addEventListener('click', () => {
        toggleForm(true, 'edit');
    });

    deleteCardBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this flashcard?')) {
            flashcardsData.splice(currentCardIndex, 1);
            if (currentCardIndex >= flashcardsData.length) {
                currentCardIndex = Math.max(0, flashcardsData.length - 1);
            }
            saveToLocalStorage();
            showCard(currentCardIndex);
        }
    });

    cancelBtn.addEventListener('click', () => {
        toggleForm(false);
    });

    flashcardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCard = {
            question: questionInput.value.trim(),
            answer: answerInput.value.trim()
        };

        if (isEditing) {
            flashcardsData[currentCardIndex] = newCard;
        } else {
            flashcardsData.push(newCard);
            currentCardIndex = flashcardsData.length - 1;
        }

        saveToLocalStorage();
        showCard(currentCardIndex);
        toggleForm(false);
    });

    // Initialize with the first card
    showCard(currentCardIndex);
});