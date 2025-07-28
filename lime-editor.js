
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pitchValue = document.getElementById('pitchValue');

const playButton = document.createElement('button');
playButton.textContent = "▶ Play Video";
playButton.style.marginTop = "10px";
playButton.style.padding = "10px";
document.body.insertBefore(playButton, canvas);

playButton.addEventListener("click", () => {
  video.play().then(() => {
    renderLoop();
    playButton.style.display = "none";
  }).catch(err => {
    alert("Playback failed: " + err.message);
  });
});

function updatePitch(val) {
  pitchValue.textContent = val;
}

function loadVideo(e) {
  const file = e.target.files[0];
  if (!file) return;

  video.src = URL.createObjectURL(file);

  video.onloadeddata = () => {
    video.load();
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
    playButton.style.display = "block";
  };

  video.onerror = () => {
    alert("❌ Failed to load video. Try using an MP4 file.");
  };
}

function renderLoop() {
  function draw() {
    if (!video.paused && !video.ended) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
    }
  }
  draw();
}

function toggleFX(element) {
  element.classList.toggle("enabled");
}

let dragged;
document.querySelectorAll(".fx-item").forEach(item => {
  item.addEventListener("dragstart", (e) => dragged = e.target);
});

function drop(e) {
  const target = e.target.closest(".fx-item");
  if (dragged && target && dragged !== target) {
    const stack = document.getElementById("fx-stack");
    stack.insertBefore(dragged, target.nextSibling);
  }
}
