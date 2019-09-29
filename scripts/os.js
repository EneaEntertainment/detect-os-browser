/**
 *
 * OS detection
 *
 * based on https://github.com/photonstorm/phaser
 * thanks!
 *
 */

const android = /Android/;
const androidVersion = /Android\s([0-9.]*)/;
const chromeOS = /CrOS/;
const iOS = /iP[ao]d|iPhone/i;
const iOSVersion = /OS (\d+)_(\d+)?/;
const kindle0 = /Kindle/;
const kindle1 = /\bKF[A-Z][A-Z]+/;
const kindle2 = /Silk.*Mobile Safari/;
const likeMacOS = /like Mac OS/;
const linux = /Linux/;
const macOS = /Mac OS/;
const macOSVersion = /OS X (\d+)_(\d+)?/;
const windows = /Windows/;
const windowsPhone0 = /Windows Phone/i;
const windowsPhone1 = /IEMobile/i;
const windowsPhone2 = /Windows NT/i;
const windowsPhone3 = /Touch/i;

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
    const result =
    {
        android        : false,
        androidVersion : -1,
        chromeOS       : false,
        cordova        : false,
        desktop        : false,
        electron       : false,
        iOS            : false,
        iOSVersion     : -1,
        kindle         : false,
        linux          : false,
        macOS          : false,
        macOSVersion   : -1,
        mobile         : false,
        node           : false,
        windows        : false,
        windowsPhone   : false
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

    /**
     * majorVersion
     *
     * @param {RegExp} regex
     * @returns {number}
     */
    const majorVersion = (regex) =>
    {
        const match = userAgent.match(regex);

        if (match === null)
        {
            return -1;
        }

        return parseInt(match[1], 10);
    };

    /**
     * hasTouch
     *
     * @returns {boolean}
     */
    const hasTouch = () =>
    {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    };

    /**
     *
     * Detect mobile device with 'request desktop website' setting turned on (tested with Chrome, Firefox, Safari)
     *
     * Today Apple has no Macs with touch screen - which detection routine relies on
     * However that can change in future and break things...
     *
     * @returns {boolean}
     */
    const isTouchMac = () =>
    {
        return (userAgent.indexOf('Macintosh') > -1) && hasTouch();
    };

    // android
    result.android = match(android);
    result.androidVersion = majorVersion(androidVersion);

    // chrome os
    result.chromeOS = match(chromeOS);

    // cordova
    result.cordova = typeof window.cordova !== 'undefined';

    // iOS/iPadOS
    result.iOS = match(iOS);
    result.iOSVersion = majorVersion(iOSVersion);

    /* eslint-disable max-len */
    // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
    // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
    /* eslint-enable max-len */

    // kindle
    result.kindle = match(kindle0) || match(kindle1) || match(kindle2);

    // linux
    result.linux = match(linux) && !match(android) && !result.kindle;

    // macOS
    result.macOS = match(macOS) && !match(likeMacOS);
    result.macOSVersion = majorVersion(macOSVersion);

    // node
    result.node = !!(typeof process !== 'undefined' && process.versions && process.versions.node);

    if (result.node && typeof process.versions === 'object')
    {
        // electron
        result.electron = typeof process.versions.electron !== 'undefined';
    }

    result.windows = match(windows);

    // windows phone
    result.windowsPhone = match(windowsPhone0) || match(windowsPhone1) || (match(windowsPhone2) && match(windowsPhone3));

    if (result.windowsPhone)
    {
        // reset
        result.android = false;
        result.iOS = false;
        result.macOS = false;
        result.windows = false;
    }

    // desktop
    if (result.chromeOS || result.linux || (result.macOS && !isTouchMac()) || result.windows)
    {
        result.desktop = true;
    }

    // mobile
    result.mobile = !result.desktop;

    return result;
}

export const os = check();
