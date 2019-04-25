
export class Params {
  constructor () {}

  public format (data: any) {
    const arr = [];
    for (const i in data) {
        if (data[i] !== undefined && data[i] !== '' && data[i] !== null) {
        const s = encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
        arr.push(s);
        }
    }
    arr.push('_=' + Date.now());
    return arr.join('&');
  }

  public fmtpages (data: any) {
    const arr: any = [];
    let n: number = 0;
    if (data !== null && typeof data === 'object') {
        for (const i in data) {
            if (typeof data[i] !== 'object') {
            if (data[i] !== undefined && data[i] !== '' && data[i] !== null) {
                const s = encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
                arr.push(s);
            }
            } else {
            if (data[i].val !== undefined && data[i].val !== '' && data[i].val !== null) {
                const num = n++;
                arr.push(encodeURIComponent('colFilter[' + num + '][col]') + '=' + i);
                arr.push(encodeURIComponent('colFilter[' + num + '][exp]') + '=' + encodeURIComponent(data[i].exp ? data[i].exp : '='));
                arr.push(encodeURIComponent('colFilter[' + num + '][val]') + '=' + encodeURIComponent(data[i].val));
            }
            }
        }
    }
    arr.push('_=' + Date.now());
    return arr.join('&');
  }
}
