const colors = [ "#DFCCFB", "#FFE4D6", "#B0D9B1", "#EADBC8", "#EADBC8", "#EFD595"];

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return colors[hash % colors.length];
}

export default function AssignColor(id) {
  return stringToColor(id);
}
