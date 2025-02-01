import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

// songs array'ini component dışına taşıyalım
const SONGS = [
  {
    url: '/audio/song1.mp3', // Giriş mesajı
    type: 'message',
    title: 'Romantik Giriş',
  },
  {
    url: '/audio/song2.mp3', // İlk buluşma
    type: 'photo',
    title: 'İlk Buluşma',
  },
  {
    url: '/audio/song3.mp3', // Film anısı
    type: 'memory',
    memoryTitle: 'İlk İzlediğimiz Film',
  },
  {
    url: '/audio/song15.mp3', // Kahve molası
    type: 'memory',
    memoryTitle: 'İlk Kahve Molası',
  },
  {
    url: '/audio/song5.mp3', // İlk tatil
    type: 'photo',
    title: 'İlk Tatilimiz',
  },
  {
    url: '/audio/song17.mp3', // İlk yemek denemesi
    type: 'memory',
    memoryTitle: 'İlk Yemek Denemem',
  },
  {
    url: '/audio/song4.mp3', // Bizim şarkılarımız
    type: 'music',
    title: 'Bizim Şarkımız',
  },
  {
    url: '/audio/song16.mp3', // İlk sürpriz
    type: 'memory',
    memoryTitle: 'İlk Sürprizin',
  },
  {
    url: '/audio/song9.mp3', // İlk dans
    type: 'memory',
    memoryTitle: 'İlk Dans',
  },
  {
    url: '/audio/song10.mp3', // Gizli notlar
    type: 'memory',
    memoryTitle: 'Gizli Notlar',
  },
  {
    url: '/audio/song11.mp3', // Yıldızların altında
    type: 'memory',
    memoryTitle: 'Yıldızların Altında',
  },
  {
    url: '/audio/song12.mp3', // Küçük sürprizler
    type: 'memory',
    memoryTitle: 'Küçük Sürprizler',
  },
  {
    url: '/audio/song13.mp3', // Bizim yerimiz
    type: 'memory',
    memoryTitle: 'Bizim Yerimiz',
  },
  {
    url: '/audio/song4.mp3', // Son mesaj
    type: 'message',
    title: 'Seni Seviyorum',
  },
];

export default function AudioPlayer({
  currentStoryIndex,
  currentType,
  stories,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let currentSong;

    if (currentType === 'music') {
      currentSong = SONGS.find((song) => song.type === 'music');
    } else if (currentType === 'memory') {
      const currentStory = stories[currentStoryIndex];
      currentSong = SONGS.find(
        (song) =>
          song.type === 'memory' && song.memoryTitle === currentStory.title
      );
    } else if (currentStoryIndex === stories.length - 1) {
      currentSong = SONGS.find((song) => song.url === '/audio/song4.mp3');
    } else {
      currentSong = SONGS.find((song) => song.type === currentType);
    }

    if (!currentSong) {
      currentSong = SONGS[0];
    }

    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log('Ses oynatma hatası:', error);
        });
      }
    }
  }, [currentStoryIndex, currentType, isPlaying, stories]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log('Ses oynatma hatası:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="absolute bottom-8 right-8 z-50">
      <button
        onClick={togglePlay}
        className="px-6 py-3 rounded-full bg-valentine-500 hover:bg-valentine-600 text-white flex items-center gap-2 shadow-lg transition-all"
      >
        {isPlaying ? (
          <>
            <PauseIcon className="h-6 w-6" />
            <span>Müziği Durdur</span>
          </>
        ) : (
          <>
            <PlayIcon className="h-6 w-6" />
            <span>Müziği Başlat</span>
          </>
        )}
      </button>
      <audio ref={audioRef} loop={true} />
    </div>
  );
}
