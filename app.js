const circleProgress = document.querySelector(".circle-progress");
const numberOfBreaths = document.querySelector(".breath-input");
const start = document.querySelector(".start");
const instructions = document.querySelector(".instructions");
const breathsText = document.querySelector(".breaths-text");
const musicSelector = document.getElementById("musicSelector");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

let breathsLeft = 3; //Default so as you enter then breaths left is 3
let isPlaying = false;
let backgroundMusic = new Audio();

// Function to update audio source based on the selection
function updateAudioSource() {
  const selectedMusic = musicSelector.value;
  backgroundMusic.src = selectedMusic;
  backgroundMusic.load(); // Load the new audio source
}

// Set the default audio when the page loads
updateAudioSource();

// Event listener for music selection
musicSelector.addEventListener("change", () => {
  updateAudioSource();
  if (isPlaying) {
    backgroundMusic.play(); // Restart the music if already playing
  }
});

// Watching for selected breaths from user
numberOfBreaths.addEventListener("change", () => {
  breathsLeft = numberOfBreaths.value;
  breathsText.innerText = breathsLeft;
});

// Grow/shrink circle by toggling the class of circle grow
const growCircle = () => {
  circleProgress.classList.add("circle-grow"); //4-4-4 method of breathe in-hold-breath out
  setTimeout(() => {
    circleProgress.classList.remove("circle-grow");
  }, 8000);
};

// Breathing Instructions
const breathTextUpdate = () => {
  breathsLeft--; //Decrease breaths left by 1
  breathsText.innerText = breathsLeft; //Update the text for breaths left
  instructions.innerText = "Breathe in for 4";
  setTimeout(() => {
    instructions.innerText = "Hold breath for 4";
    setTimeout(() => {
      instructions.innerText = "Exhale breath for 4"; // This is the exhale moment- we can setTimeout inside another setTimeout function
    }, 4000);
  }, 4000); //After 4s, we want to change text
};

// Breathing Continual App Function
const breathingApp = () => {
  //We need another variable (don't normally need) because we want to clear it after a certain amount time so we can call clear variable on that set interval
  const breathingAnimation = setInterval(() => {
    if (breathsLeft === 0) {
      clearInterval(breathingAnimation);
      instructions.innerText =
        "Breathing session completed. Click 'Begin' to start another session!";
      start.classList.remove("button-inactive"); //Remove inactive session so that user can use button again
      breathsLeft = numberOfBreaths.value; //Reset breaths left to initial value they selected when they start the session
      breathsText.innerText = breathsLeft;

      // Stop the music when the session is complete
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0; // Optionally reset the audio to the start

      return;
    }
    growCircle();
    breathTextUpdate();
  }, 12000); //Run this every 12s for the 4-4-4 method
};

// Start breathing - calling functions
start.addEventListener("click", () => {
  start.classList.add("button-inactive"); //When we start app - this button will become inactive in the process
  instructions.innerText = "Get relaxed, and ready to begin breathing";
  setTimeout(() => {
    instructions.innerText = "Breathing is about to begin...";
    setTimeout(() => {
      //When we start session- it will prompt instructions for 2s then change to second instructions then after 2s it will begin
      breathingApp();
      growCircle(); //We need these 2 functions because breathing App won't run initially but wil run after begin so these functions are the manual functions for the beginning
      breathTextUpdate();
    }, 3000);
  }, 3000);
});

// Play the music when the play icon is clicked
playIcon.addEventListener("click", () => {
  // Toggle the icons
  playIcon.classList.add("hidden");
  pauseIcon.classList.remove("hidden");
  isPlaying = true;
  backgroundMusic.play(); // Play the audio
});

// Pause the music when the pause icon is clicked
pauseIcon.addEventListener("click", () => {
  // Toggle the icons
  pauseIcon.classList.add("hidden");
  playIcon.classList.remove("hidden");
  isPlaying = false;
  backgroundMusic.pause(); // Pause the audio
});
