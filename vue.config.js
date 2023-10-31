const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Sweet Plays",
    themeColor: "#0891b2",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'dev/sw.js',
    //   // ...other Workbox options...
    // }
  },
});
