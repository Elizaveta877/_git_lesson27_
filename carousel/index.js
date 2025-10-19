
// DOM
const container = document.querySelector('#carousel')
const slidesContainer = container.querySelector('#slides-container')
const slides = container.querySelectorAll('.slide');
const indicatorsContainer = container.querySelector('#indicators-container')
const indicators = container.querySelectorAll('.indicator')
const pauseBtn = container.querySelector('#pause-btn')
const previousBtn = container.querySelector('#previous-btn')
const nextBtn = container.querySelector('#next-btn')
// const


const SLIDE_COUNT = slides.length
const CODE_SPACE = 'Space'
const COSE_ARROW_LEFT = 'ArrowLeft'
const CODE_ARROW_RIGHT = 'ArrowRight'
const FA_PAUSE = '<i class="fa-solid fa-pause"></i>'
const FA_PLAY = '<i class="fa-solid fa-play"></i>'
// const FA_PREV = '<i class="fa-solid fa-chevron-left"></i>'
// const FA_NEXT = '<i class="fa-solid fa-chevron-right"></i>'
const TIMER_INTERVAL = 2000
const SWIPE_TRESHOLD = 100
// Variables
let currentSlide = 0 
let timerId = null
let isPlaying = true
let swipStartX = null
let swipeEndX = null 

function gotoNth(n) {
 slides[currentSlide].classList.toggle('active')
 indicators[currentSlide].classList.toggle('active')

 indicators[currentSlide].style.background = null
 currentSlide = (n + SLIDE_COUNT) % SLIDE_COUNT
slides[currentSlide].classList.toggle('active')
 indicators[currentSlide].classList.toggle('active')
//  Get background color

 indicators[currentSlide].style.background = window.getComputedStyle(slides[currentSlide]).background
}


function gotoPrev() {
gotoNth(currentSlide - 1)
}

function gotoNext() {
gotoNth(currentSlide + 1)
}

function tick() {
timerId = setInterval(gotoNext, TIMER_INTERVAL)
}



function pauseHandler() {
  if (!isPlaying) 
  pauseBtn.innerHTML = FA_PLAY
clearInterval(timerId)
isPlaying = !isPlaying
}

function playHandler() {
  if (!isPlaying)
pauseBtn.innerHTML = FA_PAUSE
isPlaying = !isPlaying
 tick()
}

function togglePlayHandler() {
 isPlaying ? pauseHandler(): playHandler()
}

function nextHandler() {
gotoNext()
pauseHandler()
}

function prevHandler() {
  gotoPrev()
  pauseHandler()
}

function indicatorClickHandler(e) {
const {target} = e
if (target && target.classList.contains('indicator')) {
  pauseHandler()
  gotoNth(+target.dataset.slideTo)
}
}

function keydownHandler(e) {
  const code = e.code

  if (code === COSE_ARROW_LEFT) prevHandler()
  if (code === CODE_ARROW_RIGHT) nextHandler()
      if (code === CODE_SPACE) {
        e.preventDefault()
        togglePlayHandler()
      }
}

function swipeStartHandler(e) {
swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
}

function swipeEndHandler(e) {
  swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX


const diff = swipStartX - swipeEndX

if (diff > SWIPE_TRESHOLD) prevHandler()

  if (diff < -SWIPE_TRESHOLD) nextHandler()
}


function initEventListeners() {
pauseBtn.addEventListener('click', togglePlayHandler)
previousBtn.addEventListener('click', prevHandler)
nextBtn.addEventListener('click', nextHandler)
indicatorsContainer.addEventListener('click', indicatorClickHandler)
document.addEventListener('keydown', keydownHandler)
slidesContainer.addEventListener('touchstart', swipeStartHandler, {passive: true})
slidesContainer.addEventListener('mousdown', swipeStartHandler)
slidesContainer.addEventListener('touchend', swipeEndHandler)
slidesContainer.addEventListener('mouseup', swipeEndHandler)
}

function init() {
initEventListeners()
tick()
}


init()


