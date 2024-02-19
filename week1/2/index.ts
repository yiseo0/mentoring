export function calculateSquare(n: number): number {
  let result = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      result += 1;
    }
  }
  return result;
}

export const squire = (n: number, calculateSquare: (n: number) => number) => {
  let result = calculateSquare(n);
  console.log(result);

  return result;
};

const cache: number[] = [];
export const memoizedSquire = (
  n: number,
  calculateSquare: (n: number) => number
) => {
  if (!cache[n]) {
    cache[n] = calculateSquare(n);
  }

  return cache[n];
};

// export const memoize = <T extends unknown[], R>(func: (...args: T) => R) => {

//   return (...args: T): R => {
//     const argsKey: string = JSON.stringify(args);
//     if (results.hasOwnProperty(argsKey)) {
//       return results[argsKey];
//     }

//     const result: R = func(...args);
//     results[argsKey] = result;
//     return results[argsKey];
//   };
// };

// squire(10, calculateSquare);
// memoizeSquire(10, calculateSquare);

// const result = memoize((a: number, b: number) => { a + b });
