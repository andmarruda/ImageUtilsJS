/**
 * Main class that controls all image utilites
 * @class ImageUtils
 * @author Anderson Matheus Arruda < anderson@sysborg.com.br >
 */
class ImageUtils {
    /**
     * @description: Constructor of ImageUtils class that receives the image instance
     * @param {Image} image
     */
    constructor(image) {
        this.allowedImageTypes = {
            jpg: 'image/jpeg',
            gif: 'image/gif',
            png: 'image/png',
            svg: 'image/svg+xml',
            webp: 'image/webp'
        };

        this.image = image;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.ctx.drawImage(image, 0, 0, image.width, image.height);
    }

    /**
     * @description: Returns canvas
     * @return {Canvas}
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * @description: Returns utilities of resize image
     * @return {Resize}
     */
    resize() {
        return new Resize(this);
    }

    /**
     * Outputs canvas into some HTMLElement
     * @param {HTMLElement} element
     * @return {ImageUtils}
     */
    outputCanvas(element, canvas) {
        element.appendChild((canvas ?? this.canvas));
        return this;
    }

    /**
     * @descritption: Downloads image from canvas
     * @param {String} filename
     * @return {ImageUtils}
     */
    download(filename, canvas) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = (canvas ?? this.canvas).toDataURL();
        link.click();
        return this;
    }

    /**
     * @description: Get the color pallete of the image based on most repeated colors
     * @param {Number} colors
     * @return {Array}
     */
    getColorPallete(colors = 5, ctx) {
        const colorMap = {};
        const imageData = (ctx ?? this.ctx).getImageData(0, 0, this.canvas.width, this.canvas.height);
        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
            const rgb = `${pixels[i]},${pixels[i + 1]},${pixels[i + 2]}`;
            (rgb in colorMap) ? colorMap[rgb]++ : colorMap[rgb] = 1;
        }

        const colorArray = Object.keys(colorMap).map((key) => {
            return {
                rgb: key,
                count: colorMap[key],
            };
        });

        colorArray.sort((a, b) => b.count - a.count);
        return colorArray.slice(0, colors);
    }

    /**
     * @description: Convert RGB to HEX
     * @param {String} rgb
     * @return {String}
     */
    rgbToHex(rgb) {
        const [r, g, b] = rgb.split(',');
        return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    }

    /**
     * @description: Convert HEX to RGB
     * @param {String} hex
     * @return {String}
     */
    hexToRgb(hex) {
        const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
        return `${r},${g},${b}`;
    }

    /**
     * @description: Get file as blob
     * @return {Blob}
     */
    async getBlob(type='png', quality=1, canvas){
        const blob = await new Promise(resolve => (canvas ?? this.canvas).toBlob(resolve, this.allowedImageTypes[type], quality));
        const file = new File([blob], `picture.${type}`, {type: this.allowedImageTypes[type], lastModified: Date.now()});
        return file;
    }

    /**
     * @description: Get file as base64
     * @return {String}
     */
    async getBase64(type='png', quality=1, canvas){
        return await new Promise(resolve => resolve((canvas ?? this.canvas).toDataURL(this.allowedImageTypes[type], quality)));
    }
}

/**
 * @description: loads image from url
 * @param {String} url
 * @return {ImageUtils}
 */
IULoadFromUrl = async (url) => {
    const image = new Image();
    image.src = url;
    const imagePromise = new Promise((resolve, reject) => {
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Image load error'));
    });

    await imagePromise;
    return new ImageUtils(image);
}

/**
 * @description: loads image from input file
 * @param {HTMLInputElement} input
 * @return {ImageUtils}
 */
IULoadFromInputFile = async (input) => {
    if (!input.files || !input.files[0]) {
        throw new Error('No file selected');
    }

    const image = new Image();
    image.src = URL.createObjectURL(input.files[0]);
    const imagePromise = new Promise((resolve, reject) => {
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Image load error'));
    });

    await imagePromise;
    return new ImageUtils(image);
}