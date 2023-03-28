export default function numberFormat(num) {
    if (num < 1000) {
        return num;
    }
    return new Intl.NumberFormat().format(num);
}
//# sourceMappingURL=numberFormat.js.map