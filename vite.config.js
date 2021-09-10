// vite.config.js

module.exports = {
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      external: 'assets/webfontkit-20210416-084920/stylesheet.css',
    },
    chunkSizeWarningLimit: 20000
  },
}
