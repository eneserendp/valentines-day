import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-6 text-valentine-300">Bizim Anılarımız</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.description}
              className="rounded-lg w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg">
              <p className="text-white opacity-0 group-hover:opacity-100 p-4 text-sm">
                {photo.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for selected photo */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.description}
              className="w-full h-auto"
            />
            <div className="p-4 bg-white">
              <p className="text-gray-800 font-medium">{selectedPhoto.description}</p>
              <p className="text-gray-600 text-sm">{selectedPhoto.date}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 