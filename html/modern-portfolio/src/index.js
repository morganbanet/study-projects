/* =====================================================================
Form validation
===================================================================== */
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const submitBtn = document.querySelector('.contact-submit');
const validFeedback = document.querySelectorAll('.valid-feedback');
const invalidFeedback = document.querySelectorAll('.invalid-feedback');

async function handleSubmit(e) {
  e.preventDefault();

  myForm = e.target;
  const formData = new FormData(myForm);

  const inputs = [
    { input: document.querySelector('#name') },
    { input: document.querySelector('#email') },
    { input: document.querySelector('#message') },
  ];

  if (submitBtn.classList.contains('sent-btn')) {
    submitBtn.textContent = 'SEND MESSAGE';
    submitBtn.classList.remove('sent-btn');
  }

  if (inputs[0].input.value.trim() === '') {
    invalidate(inputs[0].input, 0);
  } else {
    validate(inputs[0].input, 0);
  }

  if (
    inputs[1].input.value.trim() === '' ||
    !inputs[1].input.value.match(mailFormat)
  ) {
    invalidate(inputs[1].input, 1);
  } else {
    validate(inputs[1].input, 1);
  }

  if (inputs[2].input.value.trim() === '') {
    invalidate(inputs[2].input, 2);
  } else {
    validate(inputs[2].input, 2);
  }

  checkAllCorrect(inputs, formData);
}

function invalidate(input, index) {
  input.classList.remove('is-valid');
  validFeedback[index].classList.add('hidden');
  input.classList.add('is-invalid');
  invalidFeedback[index].classList.remove('hidden');
}

function validate(input, index) {
  input.classList.remove('is-invalid');
  invalidFeedback[index].classList.add('hidden');
  input.classList.add('is-valid');
  validFeedback[index].classList.remove('hidden');
}

function checkAllCorrect(inputs, formData) {
  if (
    inputs[0].input.classList.contains('is-valid') &&
    inputs[1].input.classList.contains('is-valid') &&
    inputs[2].input.classList.contains('is-valid')
  ) {
    // Submit the form
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => null)
      .catch((err) => console.log(err));

    submitBtn.textContent = 'MESSAGE SENT!';
    submitBtn.classList.add('sent-btn');

    inputs.forEach((field) => {
      field.input.classList.remove('is-valid');
      field.input.classList.remove('is-invalid');
      field.input.value = '';
    });

    inputs[2].input.style.height = '107px';
  }
}

/* =====================================================================
Project overlays
===================================================================== */
function handleOverlay(e) {
  if (window.matchMedia('screen and (min-width: 1110px)').matches) {
    const overlay = e.target.children[1];

    overlay.classList.contains('enabled')
      ? overlay.classList.remove('enabled')
      : overlay.classList.add('enabled');
  }
}

/* =====================================================================
Check elements in viewport
===================================================================== */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();

  return (
    rect.right >= 0 &&
    rect.left >= 0 &&
    // rect.bottom >= 0 && // Elements re-animating when scrolling up
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function checkCardPos() {
  const projectItems = [
    {
      element: document.querySelectorAll('.project-card'),
      name: 'card-show',
    },
    {
      element: document.querySelectorAll('.project-details h3'),
      name: 'card-title-show',
    },
    {
      element: document.querySelectorAll('.project-tags'),
      name: 'card-tags-show',
    },
    {
      element: document.querySelectorAll('.project-links'),
      name: 'card-links-show',
    },
  ];

  projectItems.forEach((item) => {
    const { element, name } = item;

    element.forEach((el) => {
      isInViewport(el) ? el.classList.add(name) : el.classList.remove(name);
    });
  });
}

function checkLogoPos() {
  const logos = document.querySelectorAll('.experience');

  logos.forEach((logo) => {
    if (
      window.matchMedia('(max-width: 767px)').matches &&
      isInViewport(logos[4])
    ) {
      logo.classList.add('logo-show');
    } else if (isInViewport(logos[logos.length - 1])) {
      logo.classList.add('logo-show');
    }
  });
}

function checkElPos() {
  checkCardPos();
  checkLogoPos();
}

/* =====================================================================
Typewriter effect
===================================================================== */
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = JSON.parse(words);
    this.wait = parseInt(wait, 10); // base 10 number
    this.isDeleting = false;
    this.wordIndex = 0;
    this.txt = 'Alex Morgan';
    this.type();
  }

  type() {
    // get current word
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    // add/remove chars
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // insert text
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;
    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait; // add pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed); // integrate the typespeed
  }
}

function initTypeWriter() {
  const txtElement = document.querySelector('.about-name');
  const words = txtElement.getAttribute('data-words');
  const wait = txtElement.getAttribute('data-wait');

  new TypeWriter(txtElement, words, wait);
}

/* =====================================================================
Event listeners
===================================================================== */
const projectImage = document.querySelectorAll('.image-container');
projectImage.forEach((image) => {
  image.addEventListener('mouseenter', handleOverlay);
  image.addEventListener('mouseleave', handleOverlay);
  // image.addEventListener('touchstart', handleOverlay);
  window.addEventListener('touchcancel', handleOverlay);
});

const contactForm = document
  .querySelector('.contact-form')
  .addEventListener('submit', handleSubmit);

window.addEventListener('load', checkElPos);
window.addEventListener('resize', checkElPos);
window.addEventListener('scroll', checkElPos);
document.addEventListener('DOMContentLoaded', initTypeWriter);
