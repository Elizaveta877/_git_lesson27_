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
 currentSlide = n % SLIDE_COUNT
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
  pauseBtn.innerHTML = 'Play'
clearInterval(timerId)
isPlaying = !isPlaying
}

function playHandler() {
pauseBtn.innerHTML = 'Pause'
isPlaying = !isPlaying
 tick()
}

function togglePlayHandler() {
 isPlaying ? pauseHandler(): playHandler()
}

pauseBtn.addEventListener('click', togglePlayHandler)
previousBtn.addEventListener('click', gotoPrev)
nextBtn.addEventListener('click', gotoNext)

tick()