import type { Keyboard } from "src/types";

const rows: Keyboard.Key[][] = [];

rows.push(
  [
    {type: "none"},
    {type: "none"},
    {type: "none"},
    {type: "char", value: "z"},
    {type: "char", value: "r"},
    {type: "char", value: "b"},
    {type: "none"},
    {type: "none"},
    {type: "none"},
  ]
);

rows.push(
  [
    {type: "none"},
    {type: "none"},
    {type: "char", value: "w"},
    {type: "char", value: "l"},
    {type: "char", value: "o"},
    {type: "char", value: "t"},
    {type: "char", value: "x"},
    {type: "none"},
    {type: "none"},
  ]
);


rows.push(
  [
    {type: "none"},
    {type: "none"},
    {type: "char", value: "h"},
    {type: "char", value: "m"},
    {type: "char", value: "a"},
    {type: "char", value: "n"},
    {type: "char", value: "v"},
    {type: "none"},
    {type: "none"},
  ]
);

rows.push(
  [
    {type: "cmd", value: "prev", label: "chevron_left"},
    {type: "cmd", value: "shift", label: "shift"},
    {type: "cmd", value: "backspace", label: "backspace"},
    {type: "cmd", value: "autocomplete", label: "match_word"},
    {type: "cmd", value: "none", label: "pending"},
    {type: "cmd", value: "space", label: "space_bar"},
    {type: "cmd", value: "return", label: "keyboard_return"},
    {type: "cmd", value: "numpad", label: "123"},
    {type: "cmd", value: "next", label: "chevron_right"},
  ]
);

rows.push(
  [
    {type: "none"},
    {type: "none"},
    {type: "char", value: "q"},
    {type: "char", value: "u"},
    {type: "char", value: "e"},
    {type: "char", value: "d"},
    {type: "char", value: "g"},
    {type: "none"},
    {type: "none"},
  ]
);

rows.push(
  [
    {type: "none"},
    {type: "none"},
    {type: "char", value: "y"},
    {type: "char", value: "p"},
    {type: "char", value: "s"},
    {type: "char", value: "c"},
    {type: "char", value: "k"},
    {type: "none"},
    {type: "none"},
  ]
);


rows.push(
  [
    {type: "none"},
    {type: "none"},
    {type: "none"},
    {type: "char", value: "j"},
    {type: "char", value: "i"},
    {type: "char", value: "f"},
    {type: "none"},
    {type: "none"},
    {type: "none"},
  ]
);

export { rows };
export default rows;