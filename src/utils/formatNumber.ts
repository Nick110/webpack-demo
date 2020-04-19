/** @format */

function formatNumber(number: number): string | number {
    // 大于一亿
    if (number > 100000000) {
        return `${(number / 100000000).toFixed(1)}亿`;
    }
    if (number > 10000) {
        return `${(number / 10000).toFixed(0)}万`;
    }
    if (number < 10000) {
        return number;
    }
}

export default formatNumber;
