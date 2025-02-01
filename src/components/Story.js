import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';
import AudioPlayer from './AudioPlayer';

export default function Story({ stories }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection) => {
      if (
        currentIndex + newDirection >= 0 &&
        currentIndex + newDirection < stories.length
      ) {
        setDirection(newDirection);
        setCurrentIndex(currentIndex + newDirection);
      }
    },
    [currentIndex, stories.length]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black to-valentine-500">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2">
        {stories.map((_, index) => (
          <div
            key={index}
            className="h-1 flex-1 rounded-full bg-white bg-opacity-30 cursor-pointer"
            onClick={() => setCurrentIndex(index)}
          >
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{
                width:
                  index === currentIndex
                    ? '100%'
                    : index < currentIndex
                    ? '100%'
                    : '0%',
              }}
              transition={{ duration: index === currentIndex ? 5 : 0 }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full max-w-4xl mx-auto p-6">
            {stories[currentIndex].type === 'photo' ? (
              <PhotoStory story={stories[currentIndex]} />
            ) : stories[currentIndex].type === 'music' ? (
              <MusicStory story={stories[currentIndex]} />
            ) : stories[currentIndex].type === 'memory' ? (
              <MemoryStory story={stories[currentIndex]} />
            ) : (
              <MessageStory story={stories[currentIndex]} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition-all shadow-lg z-50"
          onClick={() => paginate(-1)}
        >
          <ChevronLeftIcon className="h-8 w-8 text-white" />
        </button>
      )}

      {currentIndex < stories.length - 1 && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition-all shadow-lg z-50"
          onClick={() => paginate(1)}
        >
          <ChevronRightIcon className="h-8 w-8 text-white" />
        </button>
      )}

      {/* Story numarası göstergesi */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full text-white">
        {currentIndex + 1} / {stories.length}
      </div>

      <AudioPlayer
        currentStoryIndex={currentIndex}
        currentType={stories[currentIndex].type}
        stories={stories}
      />
    </div>
  );
}

function PhotoStory({ story }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl p-8 shadow-2xl"
    >
      <div className="mb-6">
        <img
          src={story.image}
          alt={story.description}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="bg-white">
        <p className="text-valentine-500 font-semibold">{story.date}</p>
        <h2 className="text-2xl font-bold mt-2">{story.title}</h2>
        <p className="text-gray-600 mt-2">{story.description}</p>
      </div>
    </motion.div>
  );
}

function MusicStory({ story }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl p-6 shadow-2xl"
    >
      <div className="flex items-center space-x-4 mb-6">
        <MusicalNoteIcon className="h-8 w-8 text-valentine-500" />
        <h2 className="text-2xl font-bold">Bizim Şarkımız</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {story.songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
          >
            <div className="w-16 h-16 bg-valentine-100 rounded-md flex items-center justify-center">
              <span className="text-3xl">{index === 0 ? '🎵' : '🎶'}</span>
            </div>
            <div>
              <h3 className="font-semibold">{song.title}</h3>
              <p className="text-gray-500 text-sm">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MemoryStory({ story }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl p-8 shadow-2xl"
    >
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-4xl">{story.icon}</span>
        <div>
          <h2 className="text-2xl font-bold">{story.title}</h2>
          <p className="text-valentine-500">{story.date}</p>
        </div>
      </div>

      {story.image && (
        <div className="mb-6">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md"
          />
        </div>
      )}

      <p className="text-gray-600 text-lg mb-6 italic">"{story.description}"</p>

      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        {story.movie && <p className="font-medium">🎬 Film: {story.movie}</p>}
        {story.place && <p className="font-medium">📍 Mekan: {story.place}</p>}
        {story.order && (
          <p className="font-medium">🍵 Sipariş: {story.order}</p>
        )}
        {story.dish && <p className="font-medium">👨‍🍳 Yemek: {story.dish}</p>}
        {story.gift && <p className="font-medium">🎁 Hediye: {story.gift}</p>}
        {story.song && <p className="font-medium">🎵 Şarkı: {story.song}</p>}
        {story.result && <p className="text-gray-500 mt-2">{story.result}</p>}
        {story.reaction && (
          <p className="text-gray-500 mt-2">{story.reaction}</p>
        )}
        {story.moment && <p className="text-gray-500 mt-2">{story.moment}</p>}
      </div>
    </motion.div>
  );
}

function MessageStory({ story }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl p-8 shadow-2xl text-center"
    >
      <HeartIcon className="h-12 w-12 text-valentine-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">{story.title}</h2>
      {story.image && (
        <div className="mb-6">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
      <p className="text-xl text-gray-600">{story.message}</p>
    </motion.div>
  );
}
