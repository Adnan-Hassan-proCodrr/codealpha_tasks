# Music Player

A modern, feature-rich web-based music player with playlist functionality, search, and categorization.

## Features

✅ **Playback Controls**
- Play/Pause
- Previous/Next track
- Shuffle mode
- Repeat mode
- Volume control with mute

✅ **Playlist Management**
- Add songs to playlist
- Remove songs from playlist
- Visual indication of currently playing song

✅ **Search & Filter**
- Real-time search by song title, artist, or category
- Category filtering (All, Pop, Rock, Jazz, Electronic, Classical)

✅ **Modern UI**
- Beautiful gradient design
- Responsive layout
- Smooth animations
- Intuitive controls

## How to Use

1. **Open the Application**
   - Simply open `index.html` in your web browser

2. **Play Music**
   - Click on any song card in the Music Library to start playing
   - Use the player controls at the bottom to play, pause, skip tracks, or adjust volume

3. **Search Songs**
   - Type in the search box to filter songs by title, artist, or category

4. **Filter by Category**
   - Click on category buttons (All, Pop, Rock, Jazz, Electronic, Classical) to filter songs

5. **Manage Playlist**
   - Click the "+" button to add the currently playing song to your playlist
   - Click on a song in the playlist to play it
   - Click the "×" button to remove a song from the playlist

## Adding Your Own Music

To use your own music files:

1. Place your music files in a folder (e.g., `music/`)
2. Update the `musicLibrary` array in `script.js`:

```javascript
const musicLibrary = [
    {
        id: 1,
        title: "Your Song Title",
        artist: "Artist Name",
        category: "pop", // or "rock", "jazz", "electronic", "classical"
        url: "music/your-song.mp3" // path to your music file
    },
    // Add more songs...
];
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Notes

- The current implementation uses sample audio URLs from SoundHelix for demonstration
- Replace these with your own music file paths
- For best results, use MP3 format audio files
- The player supports standard HTML5 audio formats (MP3, OGG, WAV)

## Customization

You can customize the appearance by modifying `style.css`:
- Change colors in the gradient backgrounds
- Adjust spacing and sizing
- Modify the color scheme

Enjoy your music! 🎵


