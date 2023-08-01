/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function Image({ src, ...rest }) {
  src = src && src.includes("https://")
    ? src
    : "http://localhost:4000/uploads/" + src;
  return <img {...rest} src={src} alt="" />;
}
