const slides = document.querySelectorAll(".slide");
const upBtn = document.querySelector(".arrow .up");
const downBtn = document.querySelector(".arrow .down");
const div1 = document.querySelector(".div1");
const div2 = document.querySelector(".div2");
let current = 0;
let isAnimating = false;

function showSlide(next, direction = 1) {
  if (isAnimating) return;
  isAnimating = true;

  if (next < 0) next = slides.length - 1;
  if (next >= slides.length) next = 0;

  const currentSlide = slides[current];
  const nextSlide = slides[next];

  const bgColor = nextSlide.dataset.bgcolor;
  const circleColor = nextSlide.dataset.circle;

  // Slide transition
  gsap.to(currentSlide, { opacity: 0, duration: 1 });
  gsap.set(nextSlide, { opacity: 1 });

  // Text stagger (direction aware)
  const textEls = nextSlide.querySelectorAll(".left h1, .left p, .left button");
  gsap.from(textEls, {
    x: -50 * direction,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2
  });

  // Background image
  const leftImg = nextSlide.querySelector(".rbg .img1");
  gsap.fromTo(
    leftImg,
    { x: -60 * direction + "%", opacity: 0, rotation: -30 * direction },
    { x: "0%", opacity: 1, rotation: 0, duration: 1.5, ease: "power2.out" }
  );

  // Bottle image
  const rightImg = nextSlide.querySelector(".slid .img2");
  gsap.fromTo(
    rightImg,
    { x: 30 * direction + "%", opacity: 0, rotation: 45 * direction },
    { x: "0%", opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)" }
  );

  // Corner circles
  gsap.fromTo(
    div1,
    { x: -200 * direction, y: -200, opacity: 0 },
    { x: 0, y: 0, opacity: 1, backgroundColor: circleColor, duration: 1, ease: "power2.out" }
  );

  gsap.fromTo(
    div2,
    { x: 200 * direction, y: 200, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      backgroundColor: circleColor,
      duration: 1,
      ease: "power2.out",
      onComplete: () => (isAnimating = false),
    }
  );

  // Background color
  const bgDiv = nextSlide.querySelector(".bg");
  gsap.to(bgDiv, { backgroundColor: bgColor, duration: 1 });

  current = next;
}

// Arrow button controls
upBtn.addEventListener("click", () => showSlide(current - 1, -1));
downBtn.addEventListener("click", () => showSlide(current + 1, 1));

// Initialize first slide
slides.forEach((s, i) =>
  i === 0 ? (s.style.opacity = 1) : (s.style.opacity = 0)
);
