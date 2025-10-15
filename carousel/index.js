// DOM
const slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause-btn')
const previosBtn = document.querySelectorAll('#previous-btn')
const nextBtn = document.querySelectorAll('#next-btn')
// const

const SLIDE_COUNT = slides.length
const TIMER_INTERVAL = 2000

// Variables
let currentSlide = 0 
let timerId = null
let isPlaying = true


function nextSlide() {
 slides[currentSlide].classList.toggle('active')
 currentSlide = (currentSlide + 1) % SLIDE_COUNT
slides[currentSlide].classList.toggle('active')
}

timerId = setInterval(nextSlide, TIMER_INTERVAL)

function pauseHandler() {
  pauseBtn.innerHTML = 'Play'
clearInterval(timerId)
isPlaying = !isPlaying
}

function playHandler() {
pauseBtn.innerHTML = 'Pause'
isPlaying = !isPlaying
  timerId = setInterval(nextSlide, TIMER_INTERVAL)
}

function togglePlayHandler() {
 isPlaying ? pauseHandler(): playHandler()
}

pauseBtn.addEventListener('click', togglePlayHandler)
previosBtn.addEventListener('click, previousSlide')
nextBtn.addEventListener('click', nextSlide)