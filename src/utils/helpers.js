// partition an array based on isValid (e.g. ['apples','oranges'] => isOrange => (false) ['apples'] ; (true) ['oranges'])
export function partition(array, isValid) {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}
