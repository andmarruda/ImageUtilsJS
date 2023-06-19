/**
 * Helps the image utils doing some simple math
 * @author Anderson Matheus Arruda < anderson@sysborg.com.br >
 */

MathUtils = {
    /**
     * Calculates proportion in percentage between two numbers
     */
    calcProportion: (num1, num2) => (num1 * 100) / num2,

    /**
     * Calculates the percentage of a number
     */
    calcPercentage: (num, percentage) => (num * percentage) / 100,

    /**
     * Transform a number in percentage
     * @param {Number} num
     * @return {Number}
     */
    toPercentage: (num) => num / 100,
}