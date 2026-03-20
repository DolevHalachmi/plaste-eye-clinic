import { useEffect, useState } from 'react';

function Slider({ slides, interval = 6000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      goNext();
    }, interval);

    return () => window.clearInterval(timer);
  }, [slides.length, interval]);

  const goNext = () => {
    setCurrentIndex((index) => (index + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrentIndex((index) => (index - 1 + slides.length) % slides.length);
  };

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

export default Slider