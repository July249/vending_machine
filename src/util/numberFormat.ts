export default function numberFormat(num: number) {
  if (num < 1000) {
    return num;
  }
  return new Intl.NumberFormat().format(num);
}
