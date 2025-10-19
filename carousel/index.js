// DOM
const container = document.querySelector('#carousel')
// const slidesContainer = container.querySelector('#slides-container')
const slides = container.querySelectorAll('.slide');
// const indicatorsContainer = container.querySelector('#indicators-container')
const indicators = container.querySelectorAll('.indicator')
const pauseBtn = container.querySelector('#pause-btn')
const previousBtn = container.querySelector('#previous-btn')
const nextBtn = container.querySelector('#next-btn')
// const

const SLIDE_COUNT = slides.length
const TIMER_INTERVAL = 1000
const FA_PAUSE = '<i class="fa-solid fa-pause"></i>'
const FA_PLAY = '<i class="fa-solid fa-play"></i>'
// const FA_PREV = '<i class="fa-solid fa-chevron-left"></i>'
// const FA_NEXT = '<i class="fa-solid fa-chevron-right"></i>'


// Variables
let currentSlide = 0 
let timerId = null
let isPlaying = true


function gotoNth(n) {
 slides[currentSlide].classList.toggle('active')
 indicators[currentSlide].classList.toggle('active')
 currentSlide = (n + SLIDE_COUNT) % SLIDE_COUNT
slides[currentSlide].classList.toggle('active')
 indicators[currentSlide].classList.toggle('active')
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

pauseBtn.addEventListener('click', togglePlayHandler)
previousBtn.addEventListener('click', gotoPrev)
nextBtn.addEventListener('click', gotoNext)

tick()