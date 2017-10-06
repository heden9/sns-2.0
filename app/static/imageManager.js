import React from 'react';
import Expo from 'expo';
const images = [
    require('./icon/loading.gif'),
    require('./img/login.png'),
    require('./img/message_03.png'),
    require('./img/message_06.png'),
    require('./img/message_08.png'),
    require('./img/message_10.png'),
    require('./img/message_12.png'),
    require('./img/sound.png'),
    require('./img/heart_03.png'),
    require('./img/sound_o.png'),
];

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Expo.Asset.fromModule(image).downloadAsync();
        }
    });
}
export async function loadAssetsAsync(callback) {
    const imageAssets = cacheImages(images);
    await Promise.all([
        ...imageAssets,
    ]);
    callback && callback();
}