export function randomElements(arr: any[], count: number) {
    let len = arr.length;
    let lookup = {};
    let tmp = [];
  
    if (count > len)
      count = len;
  
    for (let i = 0; i < count; i++) {
      let index;
      do {
        index = ~~(Math.random() * len);
      } while (index in lookup);
      lookup[index] = null;
      tmp.push(arr[index]);
    }
  
    return tmp;
}

export function mapRange(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}