/**
 *
 * Browser detection
 *
 * based on https://github.com/photonstorm/phaser
 * thanks!
 *
 */

import { check as checkOS } from './os.js';

const chrome = /Chrome\/(\d+)/;
const chromeiOS = /CriOS\//;
const edge = /Edge?\/\d+/;
const firefox = /Firefox\D+(\d+)/;
const firefoxiOS = /FxiOS\//;
const ie = /MSIE (\d+\.\d+);/;
const opera = /Opera/;
const operaiOS = /OPiOS\//;
const safari = /AppleWebKit\/.*Safari\//;
const silk = /Silk/;
const trident = /Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/;

/**
 *
 * check
 *
 * @export
 * @param {string} [userAgent=navigator.userAgent]
 * @returns {object}
 */
export function check(userAgent = navigator.userAgent)
{
    const os = checkOS(userAgent);

    const result =
    {
        chrome  : false,
        edge    : false,
        firefox : false,
        ie      : false,
        opera   : false,
        safari  : false,
        silk    : false
    };

    /**
     * match
     *
     * @param {RegExp} regex
     * @returns {boolean}
     */

    const match = (regex) =>
    {
        return regex.test(userAgent);
    };

    // chrome
    result.chrome = (match(chrome) || match(chromeiOS)) && !os.windowsPhone;

    // edge
    result.edge = match(edge);

    // firefox
    result.firefox = match(firefox) || match(firefoxiOS);

    // ie
    result.ie = match(ie) || match(trident);

    // opera
    result.opera = match(opera) || match(operaiOS);

    // safari
    result.safari = match(safari) && !match(firefoxiOS) && !match(chromeiOS) && !match(operaiOS) && (os.iOS || os.macOS);

    // silk
    result.silk = match(silk);

    return result;
}

export const browser = check();
