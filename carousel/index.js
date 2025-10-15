// DOM
const slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause-btn')
const previousBtn = document.querySelector('#previous-btn')
const nextBtn = document.querySelector('#next-btn')
// const

const SLIDE_COUNT = slides.length
const TIMER_INTERVAL = 1000

// Variables
let currentSlide = 0 
let timerId = null
let isPlaying = true


function gotoNth(n) {
 slides[currentSlide].classList.toggle('active')
 currentSlide = (n + SLIDE_COUNT) % SLIDE_COUNT
slides[currentSlide].classList.toggle('active')
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
  pauseBtn.innerHTML = 'Play'
clearInterval(timerId)
isPlaying = !isPlaying
}

function playHandler() {
  if (!isPlaying)
pauseBtn.innerHTML = 'Pause'
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