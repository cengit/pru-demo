export function formatDate(date: Date): string {
  let now = date ? date : new Date();

  let y: string | number = now.getFullYear();
  let m: string | number = now.getMonth();
  let d: string | number = now.getDate();
  let h: string | number = now.getHours();
  let mm: string | number = now.getMinutes();
  let s: string | number = now.getSeconds();
  let str: string;
  if (h > 12) {
    h -= 12;
    str = ' pm';
  } else {
    str = ' am';
  }
  h = h < 10 ? '0' + h : h;
  d = d < 10 ? '0' + d : d;
  m = m < 10 ? '0' + m : m;
  mm = mm < 10 ? '0' + mm : mm;
  s = s < 10 ? '0' + s : s;
  let strDate = m + '/' + d + '/' + y + ' ' + h + ':' + mm + ':' + s;
  strDate += str;
  return strDate;
}
