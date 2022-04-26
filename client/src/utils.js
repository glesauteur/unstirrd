export function debounce(fn, timeMs) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(args);
      fn.apply(this, args);
    }, timeMs);
  };
}
