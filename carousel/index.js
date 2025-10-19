// DOM
const container = document.querySelector('#carousel')
// const slidesContainer = container.querySelector('#slides-container')
const slides = container.querySelectorAll('.slide');
const indicatorsContainer = container.querySelector('#indicators-container')
const indicators = container.querySelectorAll('.indicator')
const pauseBtn = container.querySelector('#pause-btn')
const previousBtn = container.querySelector('#previous-btn')
const nextBtn = container.querySelector('#next-btn')
// const

const SLIDE_COUNT = slides.length
const TIMER_INTERVAL = 2000
const FA_PAUSE = '<i class="fa-solid fa-pause"></i>'
const FA_PLAY = '<i class="fa-solid fa-play"></i>'
// const FA_PREV = '<i class="fa-solid fa-chevron-left"></i>'
// const FA_NEXT = '<i class="fa-solid fa-chevron-right"></i>'


// Variables
let currentSlide = 0 
let timerId = null
let isPlaying = true
let currentSlideBackground =  null

function gotoNth(n) {
 slides[currentSlide].classList.toggle('active')
 indicators[currentSlide].classList.toggle('active')

 indicators[currentSlide].style.background = null
 currentSlide = (n + SLIDE_COUNT) % SLIDE_COUNT
slides[currentSlide].classList.toggle('active')
 indicators[currentSlide].classList.toggle('active')
//  Get background color
 const computedStyle = window.getComputedStyle(slides[currentSlide])
 currentSlideBackground = computedStyle.background
 indicators[currentSlide].style.background = currentSlideBackground
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
  gotoNth(+target.dataSet.slideTo)
}
}

function keydownHandler(e) {
  const code = e.code
  console.log(code)

  if (code === 'Space') togglePlayHandler()
  if (code === 'ArrowLefr') prevHandler()
  if (code === 'ArrowRight') nextHandler()
}


pauseBtn.addEventListener('click', togglePlayHandler)
previousBtn.addEventListener('click', prevHandler)
nextBtn.addEventListener('click', nextHandler)
indicatorsContainer.addEventListener('click', indicatorClickHandler)
document.addEventListener('keydown', keydownHandler)

tick()