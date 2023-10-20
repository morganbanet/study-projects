const resetDesktop = document.querySelector('.reset-desktop');
const resetMobile = document.querySelector('.reset-mobile');
const input = document.querySelector('.controls-wrapper');
const heading = document.querySelector('.log-top');
const subHeading = document.querySelector('.log-bottom');
const playerPointsEl = document.querySelector('.player-points');
const computerPointsEl = document.querySelector('.enemy-points');
const playerWinMessage = document.querySelector('.win.player');
const computerWinMessage = document.querySelector('.win.enemy');
const playerHP = document.querySelector('.hp.player .amount');
const computerHP = document.querySelector('.hp.enemy .amount');
const imageWrappers = document.querySelectorAll('.chosen-box');
const playerImage = imageWrappers[0].firstElementChild;
const computerImage = imageWrappers[1].firstElementChild;
const musicSymbol = document.querySelector('.music-symbol');
const volumeWrapper = document.querySelector('.volume');
const volumeAmount = document.querySelector('.volume .amount');
const volumePercent = document.querySelector('.volume .percent p');
const selectAudio = document.querySelector('.select');
const musicAudio = document.querySelector('.music');

let playerChoice;
let computerChoice;

let playerPoints = 5;
let computerPoints = 5;

let shuffleImageIndex = 2;
let computerInterval;

let isGameWon = false;

function getPlayerChoice(e) {
  if (e.target.classList.contains('controls-wrapper')) {
    return;
  } else if (e.target.classList.contains('pirate')) {
    playerChoice = 'pirate';
  } else if (e.target.classList.contains('kraken')) {
    playerChoice = 'kraken';
  } else {
    playerChoice = 'treasure';
  }

  toggleChoices();
  updatePlayerImages();

  setTimeout(shuffleComputerImages, 1000);
  setTimeout(getComputerChoice, 5000);
}

function getComputerChoice() {
  const choices = ['pirate', 'kraken', 'treasure'];
  const choice = Math.floor(Math.random() * 3);
  computerChoice = choices[choice];

  checkRound();
}

function checkRound() {
  if (playerChoice === 'pirate') {
    if (computerChoice !== 'pirate') {
      if (computerChoice === 'kraken') {
        heading.textContent = 'Pirate is defeated by Kraken!';
        subHeading.textContent = 'You lose this round!';
        playerPoints--;
      } else {
        heading.textContent = 'Pirate beats Treasure!';
        subHeading.textContent = 'You win this round!';
        computerPoints--;
      }
    } else {
      heading.textContent = 'You both choose Pirate!';
      subHeading.textContent = 'It is a draw!';
    }
  } else if (playerChoice === 'kraken') {
    if (computerChoice !== 'kraken') {
      if (computerChoice === 'treasure') {
        heading.textContent = 'Kraken is defeated by Treasure!';
        subHeading.textContent = 'You lose this round!';
        playerPoints--;
      } else {
        heading.textContent = 'Kraken beats Pirate!';
        subHeading.textContent = 'You win this round!';
        computerPoints--;
      }
    } else {
      heading.textContent = 'You both choose Kraken!';
      subHeading.textContent = 'It is a draw!';
    }
  } else if (playerChoice === 'treasure') {
    if (computerChoice !== 'treasure') {
      if (computerChoice === 'pirate') {
        heading.textContent = 'Treasure is defeated by Pirate!';
        subHeading.textContent = 'You lose this round!';
        playerPoints--;
      } else {
        heading.textContent = 'Treasure beats Kraken!';
        subHeading.textContent = 'You win this round!';
        computerPoints--;
      }
    } else {
      heading.textContent = 'You both choose Treasure!';
      subHeading.textContent = 'It is a draw!';
    }
  }

  checkPoints();
  adjustHealthBars();
}

function checkPoints() {
  playerPointsEl.textContent = playerPoints;
  computerPointsEl.textContent = computerPoints;

  if (!playerPoints) {
    subHeading.textContent = 'You lost the game.';
    computerWinMessage.classList.remove('hidden');
    imageWrappers[1].classList.add('game-win');
    isGameWon = true;
  } else if (!computerPoints) {
    subHeading.textContent = 'You win the game!';
    playerWinMessage.classList.remove('game-win');
    imageWrappers[0].classList.add('game-win');
    isGameWon = true;
  } else {
    setTimeout(toggleChoices, 2000);
  }

  if (isGameWon) {
    resetDesktop.classList.remove('hidden');
    resetMobile.classList.remove('disabled');
  }
}

function adjustHealthBars() {
  const playerBarHeight = (playerPoints / 5) * 100;
  playerHP.style.height = `${playerBarHeight}%`;

  const computerBarHeight = (computerPoints / 5) * 100;
  computerHP.style.height = `${computerBarHeight}%`;
}

function updatePlayerImages() {
  playerImage.classList.remove('hidden');

  if (playerChoice !== undefined) {
    playerImage.src = `./images/${playerChoice}.png`;
    playerImage.alt = `${playerChoice}.png`;
    selectAudio.play();
  }
}

function updateComputerImages() {
  computerImage.classList.remove('hidden');

  if (computerChoice !== undefined && computerChoice !== null) {
    clearInterval(computerInterval);
    computerImage.src = `./images/${computerChoice}.png`;
    computerImage.alt = `${computerChoice.png}`;
    computerChoice = null;
    selectAudio.play();
  }
}

function shuffleComputerImages() {
  heading.textContent = 'Waiting for enemy move';
  subHeading.textContent = '...';

  const images = [
    './images/pirate.png',
    './images/kraken.png',
    './images/treasure.png',
  ];

  computerInterval = setInterval(() => {
    if (shuffleImageIndex < 0) shuffleImageIndex = 2;
    computerImage.src = images[shuffleImageIndex];
    computerImage.alt = '';
    shuffleImageIndex--;
    updateComputerImages();
  }, 120);
}

function toggleChoices() {
  input.classList.contains('disabled')
    ? input.classList.remove('disabled')
    : input.classList.add('disabled');
}

function resetGame() {
  resetDesktop.classList.add('hidden');
  resetMobile.classList.add('disabled');

  heading.textContent = "Ahoy, mateys! Ready for a game o' fun? Arrr!";
  subHeading.textContent = 'Make a move to start';

  imageWrappers[0].classList.remove('game-win');
  imageWrappers[1].classList.remove('game-win');

  playerImage.classList.add('hidden');
  computerImage.classList.add('hidden');

  playerWinMessage.classList.add('hidden');
  computerWinMessage.classList.add('hidden');

  playerPoints = 5;
  computerPoints = 5;

  adjustHealthBars();

  playerPointsEl.textContent = playerPoints;
  computerPointsEl.textContent = computerPoints;

  input.classList.remove('disabled');

  playerChoice = null;
  computerChoice = null;

  isGameWon = false;
}

/* =====================================================================
@TODO: Refactor audio code
======================================================================*/
let isDragging = false;
let displayPercent = 33;
let actualPercent = 0.33;

function initVolume() {
  volumePercent.textContent = `${displayPercent}%`;
  volumeAmount.style.width = `${displayPercent}%`;
  musicAudio.volume = actualPercent;
  selectAudio.volume = 0;
  volumeAmount.id = 'muted';

  volumeWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    changeVolume(e);
  });

  volumeWrapper.addEventListener('mousemove', changeVolume);
  volumeWrapper.addEventListener('mouseup', () => {
    isDragging = false;
  });

  volumeWrapper.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  musicSymbol.addEventListener('click', () => {
    musicSymbol.classList.contains('fa-volume-high')
      ? (displayPercent = 0)
      : (displayPercent = volumePercent.textContent.slice(0, 2));

    checkMute();
  });
}

function changeVolume(e) {
  if (isDragging) {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    displayPercent = (clickX / width) * 100;
    actualPercent = clickX / width;

    if (displayPercent < 0) displayPercent = 0;
    if (displayPercent > 100) displayPercent = 100;

    if (actualPercent < 0) actualPercent = 0;
    if (actualPercent > 0.99) actualPercent = 0.99;

    musicAudio.volume = actualPercent;

    volumeAmount.style.width = `${displayPercent}%`;
    volumePercent.textContent = `${displayPercent.toFixed(0)}%`;

    checkMute();
  }
}

function checkMute() {
  if (displayPercent === 0) {
    musicSymbol.classList.remove('fa-volume-high');
    musicSymbol.classList.add('fa-volume-xmark');
    volumeAmount.id = 'muted';
    selectAudio.volume = actualPercent / 1.5;
    musicAudio.pause();
  }

  if (displayPercent > 0) {
    musicSymbol.classList.remove('fa-volume-xmark');
    musicSymbol.classList.add('fa-volume-high');
    volumeAmount.id = '';
    selectAudio.volume = actualPercent / 1.5;
    musicAudio.play();
    musicAudio.addEventListener('ended', () => musicAudio.play());
  }
}

function startGame() {
  resetGame();
  initVolume();

  resetDesktop.addEventListener('click', resetGame);
  resetMobile.addEventListener('click', resetGame);

  input.addEventListener('click', getPlayerChoice);
}
startGame();
