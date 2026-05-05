import { useCallback, useEffect, useState } from 'react';

// Shows one slide at a time and auto-advances when there is more than one.
function Slider({ slides, interval = 6000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Moves the slider to the next item and wraps back to the start.
  const goNext = useCallback(() => {
    if (!slides.length) {
      return;
    }

    setCurrentIndex((index) => (index + 1) % slides.length);
  }, [slides.length]);

  // Moves the slider to the previous item and wraps back to the end.
  const goPrev = useCallback(() => {
    if (!slides.length) {
      return;
    }

    setCurrentIndex((index) => (index - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Starts the auto-advance timer and cleans it up on re-render/unmount.
  useEffect(() => {
    if (slides.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      goNext();
    }, interval);

    return () => window.clearInterval(timer);
  }, [goNext, interval, slides.length]);

  return (
    <section className="slider-shell">
      <div className="slider-frame">
        {slides.map((slide, index) => (
          <div
            key={`${slide.alt}-${index}`}
            className={`slide ${index === currentIndex ? 'activeSlide' : ''}`}
          >
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}

        <button type="button" className="slider-arrow next" onClick={goNext}>
          ‹
        </button>

        <button type="button" className="slider-arrow prev" onClick={goPrev}>
          ›
        </button>
      </div>

      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            key={`${slide.alt}-${index}`}
            type="button"
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Slider;
