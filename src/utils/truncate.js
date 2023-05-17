export const truncate = (string, upto=200) => (
  string && string.length > upto
  ? `${string.slice(0, upto)}...`
  : string
);