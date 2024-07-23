document.addEventListener("DOMContentLoaded", function() {
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress-bar');
    const audio = new Audio();

    let isPlaying = false;
    let currentSongIndex = 0;

    const songs = [
        { title: 'Aslamo alikum ya nabi',  file: 'assets/music/song1.mp3' },
        { title: 'Hm apne nazriye rakhte ',file: 'assets/music/song2.mp3' },
        { title: 'Nabi hi asraa ',  file: 'assets/music/song3.mp3' },
        { title: 'Sach ki zuban ', file: 'assets/music/song4.mp3' }
    ];

    function loadSong(song) {
        audio.src = song.file;
        document.getElementById('song-title').textContent = song.title;
        progressBar.value = 0;
        document.getElementById('current-time').textContent = '00:00';
        document.getElementById('remaining-time').textContent = '-00:00';
    }

    function playSong() {
        audio.play();
        playPauseButton.textContent = '| |';
        isPlaying = true;
        document.body.insertAdjacentHTML('beforeend', '<div class="waves"></div>');
    }

    function pauseSong() {
        audio.pause();
        playPauseButton.textContent = 'Play';
        isPlaying = false;
        const waves = document.querySelector('.waves');
        if (waves) waves.remove();
    }

    playPauseButton.addEventListener('click', function() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    nextButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong(); 
        } else {
            audio.play(); 
        }
    });

    prevButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            playSong(); 
        } else {
            audio.play(); 
        }
    });

    progressBar.addEventListener('input', function() {
        const seekTime = audio.duration * (progressBar.value / 100);
        audio.currentTime = seekTime;
    });

    audio.addEventListener('timeupdate', function() {
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);

        document.getElementById('current-time').textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        document.getElementById('remaining-time').textContent = `-${durationMinutes}:${durationSeconds - currentSeconds}`;
        progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    });

    audio.addEventListener('ended', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    });

    // Initial song load
    loadSong(songs[currentSongIndex]);
});
