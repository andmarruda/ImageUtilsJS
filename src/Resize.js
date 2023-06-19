/**
 * @description: Reizes images using canvas it`s resource for canva class
 * @author Anderson Matheus Arruda < anderson@sysborg.com.br >
 */

class Resize {
    /**
     * @description: Constructor of Resize class that receives the canvas instance
     * @param {ImageUtils} iu
     */
    constructor(iu) {
        this.iu = iu;
        this.canvas = iu.getCanvas();
    }

    /**
     * @description: Resize the image to the specified width and height
     * @param {Number} width
     * @param {Number} height
     */
    resize(width, height) {
        this.resizedCanvas = document.createElement('canvas');
        this.resizedCtx = this.resizedCanvas.getContext('2d');
        this.resizedCanvas.width = width;
        this.resizedCanvas.height = height;
        this.resizedCtx.drawImage(this.canvas, 0, 0, width, height);

        return this;
    }

    /**
     * @description: Resize the image using percentage
     * @param {Number} percentage
     */
    resizeByPercentage(percentage) {
        percentage = MathUtils.toPercentage(percentage);
        this.resize(
            this.canvas.width * percentage, 
            this.canvas.height * percentage
        );

        return this;
    }

    /**
     * @description: Resize image by width proportional
     * @param {Number} newWidth
     */
    resizeByWidth(newWidth) {
        const percentage = MathUtils.calcProportion(newWidth, this.canvas.width);
        this.resizeByPercentage(percentage);

        return this;
    }

    /**
     * @description: Resize image by height proportional
     * @param {Number} newHeight
     */
    resizeByHeight(newHeight) {
        const percentage = MathUtils.calcProportion(newHeight, this.canvas.height);
        this.resizeByPercentage(percentage);

        return this;
    }

    /**
     * @description: Returns resized file canvas
     * @return {Canvas}
     */
    getResizedCanvas() {
        return this.resizedCanvas;
    }

    /**
     * @description: Outputs resized canvas into some HTMLElement
     * @param {HTMLElement} element
     * @return {Resize}
     */
    outputResizedCanvas(element) {
        this.iu.outputCanvas(element, this.resizedCanvas);
        return this;
    }

    /**
     * Get resized color pallete
     * @param {Number} colors
     * @return {Array}
     */
    getResizedColorPallete(colors) {
        return this.iu.getColorPallete(colors, this.resizedCtx);
    }
}