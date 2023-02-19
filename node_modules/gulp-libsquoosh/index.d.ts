export = squoosh;
/**
 * @typedef { import('vinyl') } File
 */
/**
 * @typedef {Object} BoxSize
 * @property {number} width
 * @property {number} height
 */
/**
 * @typedef {Object} SquooshOptions
 * @property {EncodeOptions} encodeOptions
 * @property {PreprocessOptions} preprocessOptions
 */
/**
 * @callback SquooshCallback
 * @param {ImageSize} imageSize
 * @returns {BoxSize}
 */
/**
 * @typedef {Object} EncodeOptions
 * @property {Object} [mozjpeg]
 * @property {Object} [webp]
 * @property {Object} [avif]
 * @property {Object} [jxl]
 * @property {Object} [wp2]
 * @property {Object} [oxipng]
 */
/**
 * @typedef {Object} PreprocessOptions
 * @property {Object} [resize]
 * @property {Object} [quant]
 * @property {Object} [rotate]
 */
/**
 * Minify images with libSquoosh.
 * @param {(EncodeOptions|SquooshOptions|SquooshCallback)} [encodeOptions] - An object with encoders to use, and their settings.
 * @param {Object} [PreprocessOptions] - An object with preprocessors to use, and their settings.
 * @returns {NodeJS.ReadWriteStream}
 */
declare function squoosh(encodeOptions?: (EncodeOptions | SquooshOptions | SquooshCallback), preprocessOptions: any): NodeJS.ReadWriteStream;
declare namespace squoosh {
    export { DefaultEncodeOptions, ImageSize, File, BoxSize, SquooshOptions, SquooshCallback, EncodeOptions, PreprocessOptions };
}
type EncodeOptions = {
    mozjpeg?: any;
    webp?: any;
    avif?: any;
    jxl?: any;
    wp2?: any;
    oxipng?: any;
};
type SquooshOptions = {
    encodeOptions: EncodeOptions;
    preprocessOptions: PreprocessOptions;
};
type SquooshCallback = (imageSize: ImageSize) => BoxSize;
/**
 * : Object}
 */
type DefaultEncodeOptions = [extension: string];
/**
 * By default, encode to same image type.
 * @typedef {[extension:string]: Object}
 */
declare const DefaultEncodeOptions: {
    [k: string]: any;
};
/**
 * @class
 * @param {Object} bitmap
 * @param {string} path - The full path to the file.
 */
declare function ImageSize({ bitmap }: any, path: string): void;
declare class ImageSize {
    /**
     * @class
     * @param {Object} bitmap
     * @param {string} path - The full path to the file.
     */
    constructor({ bitmap }: any, path: string);
    /** @type {number} */
    width: number;
    /** @type {number} */
    height: number;
    path: string;
    /**
     * Scale to keep its aspect ratio while fitting within the specified bounding box.
     * @param {number} targetWidth
     * @param {number} [targetHeight]
     * @returns {BoxSize}
     */
    contain(targetWidth: number, targetHeight?: number): BoxSize;
    /**
     * Acts like contain() but don't zoom if image is smaller than the specified bounding box.
     * @param {number} targetWidth
     * @param {number} [targetHeight]
     * @returns {BoxSize}
     */
    scaleDown(targetWidth: number, targetHeight?: number): BoxSize;
    /**
     * Scale to keep its aspect ratio while filling the specified bounding box.
     * This method is not usable because libSquoosh doesn't provide crop functionality.
     * @param {number} targetWidth
     * @param {number} [targetHeight]
     * @returns {BoxSize}
     */
    cover(targetWidth: number, targetHeight?: number): BoxSize;
}
type File = import('vinyl');
type BoxSize = {
    width: number;
    height: number;
};
type PreprocessOptions = {
    resize?: any;
    quant?: any;
    rotate?: any;
};
