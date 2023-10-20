let secretNumber = generateNumber();
let score = 20;
let highscore = 0;

// See the secret number
// document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function guess() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  // When there is no number
  if (!guess) {
    displayMessage('⛔ No number!');

    // When the game is won
  } else if (guess === secretNumber) {
    displayMessage('🎉 You won the game!');

    updateScreen(
      'linear-gradient(to bottom right, aqua, pink 50%)',
      '0 0 20px 20px aqua'
    );

    if (score > highscore) {
      displayHighScore(score);
    }

    //when the number is not correct
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      displayScore(--score);
    } else {
      displayMessage('💀 You lose the game!');
      displayScore(0);

      updateScreen(
        'linear-gradient(to bottom right, black, pink)',
        '0 0 20px 20px darkred'
      );
    }
  }
});

// When reset is clicked
document.querySelector('.reset').addEventListener('click', function () {
  displayMessage('Make a guess...');
  secretNumber = generateNumber();

  // See secret number when reset
  // document.querySelector('.number').textContent = secretNumber;

  score = 20;
  displayScore(20);

  updateScreen(
    'linear-gradient(to bottom right, blue, pink)',
    '0 0 10px 10px aqua'
  );
});

// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelector('.about');
const btnCloseModal = document.querySelector('.exit');

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('.hidden')) {
    closeModal();
  }
});

// Functions
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function generateNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function displayScore(score) {
  document.querySelector('.score').textContent = score;
}

function displayHighScore(score) {
  highscore = score;
  document.querySelector('.highscore').textContent = highscore;
}

function updateScreen(color, border) {
  document.querySelector('body').style.background = color;
  document.querySelector('.number').style.boxShadow = border;
}
