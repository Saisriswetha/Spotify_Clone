console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/3.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let song = [ 
    { songname: "Heat Waves", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songname: "As It Was", filePath: "song/2.mp3", coverPath: "covers/2.jpg" }, // Corrected coverpath
    { songname: "Let Her Go", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songname: "Dream On", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songname: "Harleys In Hawaii", filePath: "song/5.mp3", coverPath: "covers/5.jpg" }
]

// Update song information and cover image
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = song[i].songname;
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    
    // Update seekbar 
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays=()=>{
	Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
		element.classList.remove('fa-pause-circle');	
		element.classList.add('fa-play-circle');	
	})
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
	element.addEventListener('click', (e)=>{
		console.log(e.target);
		makeAllPlays();
		songIndex=parseInt(e.target.id);
		e.target.classList.remove('fa-play-circle');
		e.target.classList.add('fa-pause-circle');
		audioElement.src = `song/${songIndex+1}.mp3`;
		masterSongName.innerText = song[songIndex].songname;
		audioElement.currentTime=0;
		audioElement.play();
		gif.style.opacity = 1;
		masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

	})
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= song.length - 1){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= song.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = song[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

function playNextSong() {
    if (songIndex < song.length - 1) {
        songIndex++;
        audioElement.src = song[songIndex].filePath;
        masterSongName.innerText = song[songIndex].songname;
        audioElement.play();
    } else {
        // You can add logic to handle what happens when the playlist ends.
        // For example, you can stop playback or loop back to the first song.
    }
}

// Event listener for the 'ended' event
audioElement.addEventListener('ended', playNextSong);

// ... Your existing code ...

// Click event listeners for previous and next buttons
document.getElementById('previous').addEventListener('click', () => {
    // Your code for playing the previous song
});

document.getElementById('next').addEventListener('click', () => {
    playNextSong(); // Play the next song when the 'Next' button is clicked
});
