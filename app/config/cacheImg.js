import React from 'react';
import Expo from 'expo';
/**
 *
 * @param images: Array 传入图片
 */
export function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Expo.Asset.fromModule(image).downloadAsync();
        }
    });
}