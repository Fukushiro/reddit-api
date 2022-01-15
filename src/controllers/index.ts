export function checkNull(arr: Array<any>) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == undefined) {
      return false;
    }
  }
  return true;
}
