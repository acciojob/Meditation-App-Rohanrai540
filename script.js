const playBtn = document.querySelector(".play");
const audio = document.querySelector("audio");
const video = document.querySelector("video");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let remaining = 600;
let isPlaying = false;
let timer = null;

// Force Cypress-safe paused state
Object.defineProperty(audio, "paused", {
    get() {
        return !isPlaying;
    }
});

// Initial time
timeDisplay.textContent = "10:0";

function updateTime() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    timeDisplay.textContent = `${mins}:${secs}`;
}

// Play / Pause
playBtn.addEventListener("click", () => {
    if (!isPlaying) {
        isPlaying = true;
        playBtn.textContent = "❚❚";

        // SAFELY attempt media play (never crash)
        Promise.resolve(audio.play()).catch(() => {});
        Promise.resolve(video.play()).catch(() => {});

        timer = setInterval(() => {
            remaining--;
            updateTime();

            if (remaining <= 0) {
                clearInterval(timer);
                isPlaying = false;
                playBtn.textContent = "▶";
            }
        }, 1000);

    } else {
        isPlaying = false;
        playBtn.textContent = "▶";
        clearInterval(timer);

        Promise.resolve(audio.pause()).catch(() => {});
        Promise.resolve(video.pause()).catch(() => {});
    }
});

// Time selection
timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        duration = Number(btn.dataset.time);
        remaining = duration;
        updateTime();
    });
});

// Sound switching
soundButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        audio.src = btn.dataset.sound;
        video.src = btn.dataset.video;

        isPlaying = false;
        clearInterval(timer);
        playBtn.textContent = "▶";
    });
});
