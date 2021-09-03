module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    themeColor: '#83332C',
    msTileColor: '#FAFAFA'
  },
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test/'
    : '/'
}
