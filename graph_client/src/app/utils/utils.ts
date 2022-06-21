/* Reusable utilities */

export function sort(arr: any[], descending: boolean = false) {
  return !descending ?  arr.sort((one, two) => (one < two ? -1 : 1)) :
    arr.sort((one, two) => (one > two ? -1 : 1));
}