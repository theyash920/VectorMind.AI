const { getDefaultConfig } = require('expo/metro-config');
<<<<<<< HEAD
=======
const { withNativeWind } = require('nativewind/metro');
>>>>>>> d9764fa (updated readme)

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

<<<<<<< HEAD
module.exports = config;
=======
module.exports = withNativeWind(config, { input: './global.css' });
>>>>>>> d9764fa (updated readme)
