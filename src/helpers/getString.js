export default (key, value, spacer, symbol = ' ') => {
  switch (symbol) {
    case (' '): {
      return `${spacer}${key}: ${value}`;
    }
    default:
      return `${spacer.slice(0, -2)}${symbol} ${key}: ${value}`;
  }
};
