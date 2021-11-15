export const capitalizeSingleWord = (value) => {
  return typeof value === 'string'
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : parseInt(value);
};
