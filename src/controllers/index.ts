export function checkNull(arr: Array<any>) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == undefined || arr[i] == null) {
      return false;
    }
  }
  return true;
}
