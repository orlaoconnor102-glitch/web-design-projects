document.querySelectorAll(".planet-wrapper").forEach(wrapper => {
  const planet = wrapper.querySelector(".planet");
  const label = wrapper.querySelector(".planet-label");

  let sparkleInterval = null;
  let animating = false;

  wrapper.addEventListener("mouseenter", () => {
    if (animating) return;
    animating = true;

    const planetKey = wrapper.dataset.planet;
    const animClass = "animate-" + planetKey;

    planet.classList.remove(animClass);
    void planet.offsetWidth;

    label.classList.remove("draw-chalk");
    void label.offsetWidth;

    planet.classList.add(animClass);

    const onEnd = () => {
      planet.removeEventListener("animationend", onEnd);

      label.classList.add("show-label");
      label.classList.add("draw-chalk");

      sparkleInterval = setInterval(() => {
        createSparkle(wrapper);
      }, 300);

      animating = false;
    };

    planet.addEventListener("animationend", onEnd);
  });

  wrapper.addEventListener("mouseleave", () => {
    const planetKey = wrapper.dataset.planet;
    const animClass = "animate-" + planetKey;

    planet.classList.remove(animClass);

    label.classList.remove("show-label");
    label.classList.remove("draw-chalk");

    if (sparkleInterval) {
      clearInterval(sparkleInterval);
      sparkleInterval = null;
    }

    wrapper.querySelectorAll(".sparkle").forEach(s => s.remove());

    animating = false;
  });
});

function createSparkle(wrapper) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  const size = Math.random() * 12 + 10;
  sparkle.style.width = size + "px";
  sparkle.style.height = size + "px";

  sparkle.style.left = (Math.random() * 140 - 20) + "%";
  sparkle.style.top = (Math.random() * 140 - 20) + "%";

  wrapper.appendChild(sparkle);

  requestAnimationFrame(() => {
    sparkle.style.transition = "all 0.8s ease-out";
    sparkle.style.opacity = 1;
    sparkle.style.transform = "translateY(-40px) rotate(40deg)";
  });

  setTimeout(() => {
    burstSparkle(sparkle);
  }, 800);
}

function burstSparkle(sparkle) {
  const wrapper = sparkle.parentElement;

  for (let i = 0; i < 4; i++) {
    const fragment = document.createElement("div");
    fragment.classList.add("sparkle");
    fragment.style.width = "6px";
    fragment.style.height = "6px";
    fragment.style.left = sparkle.style.left;
    fragment.style.top = sparkle.style.top;
    wrapper.appendChild(fragment);

    requestAnimationFrame(() => {
      fragment.style.transition = "all 0.4s ease-out";
      fragment.style.opacity = 0;
      fragment.style.transform =
        `translate(${(Math.random() - 0.5) * 40}px, ${(Math.random() - 0.5) * 40}px) scale(0.3)`;
    });

    setTimeout(() => fragment.remove(), 450);
  }

  sparkle.remove();
}
