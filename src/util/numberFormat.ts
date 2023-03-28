export default function numberFormat(num: number) {
  return new Intl.NumberFormat().format(num);
}
