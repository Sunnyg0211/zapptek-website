{/* TRUST POINTS – Animated Hover Cards */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
>
  {trustPoints.map((item, index) => (
    <motion.div
      key={index}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-5 text-left shadow-md hover:shadow-2xl transition-all group cursor-pointer"
    >
      <motion.div
        whileHover={{ rotate: 6, scale: 1.1 }}
        className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3"
      >
        <item.icon className="w-5 h-5 text-white" />
      </motion.div>

      <h4 className="text-white font-semibold mb-1 group-hover:tracking-wide transition-all">
        {item.title}
      </h4>

      <p className="text-sm text-white/80 group-hover:text-white transition-colors">
        {item.text}
      </p>
    </motion.div>
  ))}
</motion.div>
