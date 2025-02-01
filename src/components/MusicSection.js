import { motion } from 'framer-motion';

export default function MusicSection({ songs }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">En Çok Dinlediğimiz Şarkılar</h3>
      
      {songs.map((song, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center space-x-4"
        >
          <span className="text-2xl font-bold text-valentine-500">
            #{index + 1}
          </span>
          <div>
            <h4 className="font-medium">{song.title}</h4>
            <p className="text-sm text-gray-300">{song.artist}</p>
          </div>
          <div className="ml-auto">
            <span className="text-sm text-gray-400">
              {song.playCount} kez dinlendi
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 