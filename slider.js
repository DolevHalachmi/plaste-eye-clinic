const slides = document.querySelectorAll(".slides");
const interval = 4000;
let currSlideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded" , () => {initSlider(interval)});


function initSlider(interval){
    if(slides.length > 0){
        showSlide(currSlideIndex);
        intervalId = setInterval(nextClick, interval);
    }
}

function showText(index){
    
}


function showSlide(index){
    slides.forEach(function(slide){
        slide.classList.remove("activeSlide")
    });
    
    if (index>=slides.length){
        currSlideIndex = 0;
    }
    else if (index<0){
        currSlideIndex = slides.length - 1;
    }
    slides[currSlideIndex].classList.add("activeSlide")
}

function prevClick(){
    currSlideIndex--;
    showSlide(currSlideIndex);
    if(intervalId === null){
        intervalId = setInterval(nextClick, interval)
    }
}


function nextClick(){
    currSlideIndex++;
    showSlide(currSlideIndex);
    if(intervalId === null){
        intervalId = setInterval(nextClick, interval)
    }
}

function shiftClick(index){
    currSlideIndex = index;
    showSlide(currSlideIndex);
    if(intervalId != null){
        clearInterval(intervalId);
        intervalId = null;
    }
}