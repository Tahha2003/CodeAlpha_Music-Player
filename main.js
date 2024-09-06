const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress');
const volumeControl = document.getElementById('volume-control');
const addSongBtn = document.getElementById('add-song-btn');

let currentTrack = 0;
const tracks = [
    { title: "Mellow-Future-Bass-Bounce-On-It", artist: "Pixabay", src: "mellow-future-bass-bounce-on-it-184234.mp3" },
    { title: "Movement", artist: "Pixabay", src: "movement-200697.mp3" },
    { title: "Nightfall-Future-Bass", artist: "Pixabay", src: "nightfall-future-bass-music-228100.mp3" }
];

function loadTrack(index) {
    audioPlayer.src = tracks[index].src;
    document.getElementById('track-title').innerText = tracks[index].title;
    document.getElementById('track-artist').innerText = tracks[index].artist;
    audioPlayer.load();
}

function playPauseTrack() {
    const playPauseIcon = playPauseBtn.querySelector('i');
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        audioPlayer.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

function updateProgressBar() {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${percentage}%`;
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playPauseTrack();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    playPauseTrack();
}

function addNewSong() {
    const title = document.getElementById('new-title').value;
    const artist = document.getElementById('new-artist').value;
    const fileInput = document.getElementById('new-audio');
    const file = fileInput.files[0];

    if (title && artist && file) {
        const newTrack = {
            title: title,
            artist: artist,
            src: URL.createObjectURL(file)
        };

        tracks.push(newTrack);

        document.getElementById('new-title').value = '';
        document.getElementById('new-artist').value = '';
        fileInput.value = '';

        alert(`Added "${title}" by ${artist}`);
    } else {
        alert('Please fill in all fields and select an audio file.');
    }
}

playPauseBtn.addEventListener('click', playPauseTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audioPlayer.addEventListener('timeupdate', updateProgressBar);
volumeControl.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});
addSongBtn.addEventListener('click', addNewSong);

loadTrack(currentTrack);
