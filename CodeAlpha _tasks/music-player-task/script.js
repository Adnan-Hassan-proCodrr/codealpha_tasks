// Sample music library (replace with your actual music files)
const musicLibrary = [
    {
        id: 1,
        title: "Summer Vibes",
        artist: "DJ Sunshine",
        category: "electronic",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        title: "Rock Anthem",
        artist: "Thunder Band",
        category: "rock",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        title: "Jazz Night",
        artist: "Smooth Jazz Trio",
        category: "jazz",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        title: "Pop Sensation",
        artist: "Star Pop",
        category: "pop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        title: "Classical Symphony",
        artist: "Orchestra Master",
        category: "classical",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        title: "Electric Dreams",
        artist: "Synth Wave",
        category: "electronic",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop"
    },
    {
        id: 7,
        title: "Hard Rock",
        artist: "Metal Head",
        category: "rock",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    },
    {
        id: 8,
        title: "Smooth Jazz",
        artist: "Jazz Collective",
        category: "jazz",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop"
    },
    {
        id: 9,
        title: "Top Hit",
        artist: "Pop Star",
        category: "pop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
    },
    {
        id: 10,
        title: "Mozart Magic",
        artist: "Classical Ensemble",
        category: "classical",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    }
];

// State management
let currentSong = null;
let currentIndex = -1;
let isPlaying = false;
let isShuffled = false;
let isRepeated = false;
let playlist = [];
let filteredSongs = [...musicLibrary];
let currentCategory = 'all';

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const songsGrid = document.getElementById('songsGrid');
const playlistEl = document.getElementById('playlist');
const currentSongTitle = document.getElementById('currentSongTitle');
const currentSongArtist = document.getElementById('currentSongArtist');
const miniSongTitle = document.getElementById('miniSongTitle');
const miniSongArtist = document.getElementById('miniSongArtist');
const addToPlaylistBtn = document.getElementById('addToPlaylistBtn');

// Initialize
function init() {
    renderSongs();
    setupEventListeners();
    audioPlayer.volume = 0.5;
    volumeSlider.value = 50;
}

// Render songs in the grid
function renderSongs() {
    songsGrid.innerHTML = '';
    
    filteredSongs.forEach((song, index) => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        if (currentSong && currentSong.id === song.id) {
            songCard.classList.add('active');
        }
        
        const imageUrl = song.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop';
        songCard.innerHTML = `
            <div class="song-card-art">
                <img src="${imageUrl}" alt="${song.title}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.querySelector('i').style.display='flex';">
                <i class="fas fa-music" style="display: none;"></i>
            </div>
            <div class="song-card-title">${song.title}</div>
            <div class="song-card-artist">${song.artist}</div>
            <div class="song-card-category">${song.category}</div>
        `;
        
        songCard.addEventListener('click', () => playSong(song, index));
        songsGrid.appendChild(songCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Player controls
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    muteBtn.addEventListener('click', toggleMute);
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
        if (audioPlayer.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (audioPlayer.volume < 0.5) {
            muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Progress bar
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = pos * audioPlayer.duration;
    });
    
    // Audio events
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });
    
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.style.width = progressPercent + '%';
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        }
    });
    
    audioPlayer.addEventListener('ended', () => {
        if (isRepeated) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            playNext();
        }
    });
    
    // Search
    searchInput.addEventListener('input', (e) => {
        filterSongs(e.target.value);
    });
    
    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterSongs(searchInput.value);
        });
    });
    
    // Add to playlist
    addToPlaylistBtn.addEventListener('click', addCurrentToPlaylist);
}

// Play song
function playSong(song, index = -1) {
    currentSong = song;
    if (index !== -1) {
        currentIndex = index;
    } else {
        currentIndex = filteredSongs.findIndex(s => s.id === song.id);
    }
    
    audioPlayer.src = song.url;
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseButton();
    updateSongInfo();
    renderSongs();
    updatePlaylistUI();
}

// Toggle play/pause
function togglePlayPause() {
    if (!currentSong) {
        if (filteredSongs.length > 0) {
            playSong(filteredSongs[0], 0);
        }
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayPauseButton();
}

// Update play/pause button
function updatePlayPauseButton() {
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Play previous
function playPrevious() {
    if (filteredSongs.length === 0) return;
    
    if (isShuffled) {
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        playSong(filteredSongs[randomIndex], randomIndex);
    } else {
        currentIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
        playSong(filteredSongs[currentIndex], currentIndex);
    }
}

// Play next
function playNext() {
    if (filteredSongs.length === 0) return;
    
    if (isShuffled) {
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        playSong(filteredSongs[randomIndex], randomIndex);
    } else {
        currentIndex = (currentIndex + 1) % filteredSongs.length;
        playSong(filteredSongs[currentIndex], currentIndex);
    }
}

// Toggle shuffle
function toggleShuffle() {
    isShuffled = !isShuffled;
    shuffleBtn.style.color = isShuffled ? '#667eea' : '#fff';
}

// Toggle repeat
function toggleRepeat() {
    isRepeated = !isRepeated;
    repeatBtn.style.color = isRepeated ? '#667eea' : '#fff';
}

// Toggle mute
function toggleMute() {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audioPlayer.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update song info
function updateSongInfo() {
    if (currentSong) {
        currentSongTitle.textContent = currentSong.title;
        currentSongArtist.textContent = currentSong.artist;
        miniSongTitle.textContent = currentSong.title;
        miniSongArtist.textContent = currentSong.artist;
        
        // Update album art images
        const albumArt = document.querySelector('.album-art');
        const miniAlbumArt = document.querySelector('.mini-album-art');
        
        if (albumArt) {
            if (currentSong.image) {
                albumArt.innerHTML = `<img src="${currentSong.image}" alt="${currentSong.title}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.querySelector('i').style.display='flex';"><i class="fas fa-music" style="display: none;"></i>`;
            } else {
                albumArt.innerHTML = '<i class="fas fa-music"></i>';
            }
        }
        
        if (miniAlbumArt) {
            if (currentSong.image) {
                miniAlbumArt.innerHTML = `<img src="${currentSong.image}" alt="${currentSong.title}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.querySelector('i').style.display='flex';"><i class="fas fa-music" style="display: none;"></i>`;
            } else {
                miniAlbumArt.innerHTML = '<i class="fas fa-music"></i>';
            }
        }
    }
}

// Filter songs by search and category
function filterSongs(searchTerm = '') {
    let filtered = [...musicLibrary];
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(song => song.category === currentCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(song => 
            song.title.toLowerCase().includes(term) ||
            song.artist.toLowerCase().includes(term) ||
            song.category.toLowerCase().includes(term)
        );
    }
    
    filteredSongs = filtered;
    
    // Update current index if current song is not in filtered list
    if (currentSong && !filteredSongs.find(s => s.id === currentSong.id)) {
        currentIndex = -1;
    } else if (currentSong) {
        currentIndex = filteredSongs.findIndex(s => s.id === currentSong.id);
    }
    
    renderSongs();
}

// Add current song to playlist
function addCurrentToPlaylist() {
    if (!currentSong) {
        alert('Please select a song first!');
        return;
    }
    
    if (!playlist.find(song => song.id === currentSong.id)) {
        playlist.push(currentSong);
        renderPlaylist();
    } else {
        alert('Song is already in the playlist!');
    }
}

// Remove song from playlist
function removeFromPlaylist(songId) {
    playlist = playlist.filter(song => song.id !== songId);
    renderPlaylist();
}

// Render playlist
function renderPlaylist() {
    playlistEl.innerHTML = '';
    
    if (playlist.length === 0) {
        playlistEl.innerHTML = '<li style="padding: 20px; text-align: center; color: rgba(255,255,255,0.5);">Your playlist is empty</li>';
        return;
    }
    
    playlist.forEach(song => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        if (currentSong && currentSong.id === song.id) {
            li.classList.add('active');
        }
        
        li.innerHTML = `
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <button class="remove-btn" onclick="removeFromPlaylist(${song.id})">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        li.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-btn')) {
                const index = musicLibrary.findIndex(s => s.id === song.id);
                playSong(song, index);
            }
        });
        
        playlistEl.appendChild(li);
    });
}

// Update playlist UI
function updatePlaylistUI() {
    renderPlaylist();
}

// Initialize the app
init();


