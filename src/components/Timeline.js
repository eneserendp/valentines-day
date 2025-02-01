import { motion } from 'framer-motion';

export default function Timeline({ events }) {
  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-6 text-valentine-300">Bizim Hikayemiz</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-valentine-300" />
        
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-8`}
          >
            <div className="w-1/2 px-4">
              <div className={`bg-white rounded-lg p-4 shadow-lg ${
                index % 2 === 0 ? 'mr-4' : 'ml-4'
              }`}>
                <h4 className="text-lg font-semibold text-valentine-500">{event.date}</h4>
                <p className="text-gray-700">{event.description}</p>
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.description}
                    className="mt-2 rounded-lg w-full h-40 object-cover"
                  />
                )}
              </div>
            </div>
            <div className="w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 