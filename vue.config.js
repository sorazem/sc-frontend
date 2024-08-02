const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'Venti',
    iconPaths: {
      favicon32: 'public/icon.png',
   }
  }
})
