import type { Keyboard } from "src/types";

const textKeys: Keyboard.Key[][] = [];

textKeys.push(
  [
    { type: "none" },
    { type: "none" },
    { type: "none" },
    { type: "char", value: "z" },
    { type: "char", value: "r" },
    { type: "char", value: "b" },
    { type: "none" },
    { type: "none" },
    { type: "none" },
  ]
);

textKeys.push(
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "w" },
    { type: "char", value: "l" },
    { type: "char", value: "o" },
    { type: "char", value: "t" },
    { type: "char", value: "x" },
    { type: "none" },
    { type: "none" },
  ]
);


textKeys.push(
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "h" },
    { type: "char", value: "m" },
    { type: "char", value: "a" },
    { type: "char", value: "n" },
    { type: "char", value: "v" },
    { type: "none" },
    { type: "none" },
  ]
);


textKeys.push(
  [
    {
      type: "cmd",
      value: "prev",
      label: "chevron_left",
      action: () => {return}
    },
    {
      type: "cmd",
      value: "shift",
      label: "shift",
      action: ({value: {active, locked}, setter}:
        Keyboard.CmdKeyAction<Keyboard.Caps>) => {
        if (!active && !locked) {
          setter({active: true, locked: false})
        } else if (active && !locked) {
          setter({active: true, locked: true})
        } else {
          setter({active: false, locked: false})
        }
      }
    },
    {
      type: "cmd",
      value: "backspace",
      label: "backspace",
      action: ({value, setter}: Keyboard.CmdKeyAction<string>) => {
        setter(value.substring(0, value.length - 1))
      }
    },
    {
      type: "cmd",
      value: "autocomplete",
      label: "match_word",
      action: () => {return}
    },
    { type: "neutral" },
    {
      type: "cmd",
      value: "space",
      label: "space_bar",
      action: ({value, setter}: Keyboard.CmdKeyAction<string>) => {
        setter(`${value} `)
      }
    },
    {
      type: "cmd",
      value: "return",
      label: "keyboard_return",
      action: () => {return}
    },
    {
      type: "cmd",
      value: "numpad",
      label: "123",
      action: () => {return}
    },
    {
      type: "cmd",
      value: "next",
      label: "chevron_right",
      action: () => {return}
    },
  ]
);

textKeys.push(
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "q" },
    { type: "char", value: "u" },
    { type: "char", value: "e" },
    { type: "char", value: "d" },
    { type: "char", value: "g" },
    { type: "none" },
    { type: "none" },
  ]
);

textKeys.push(
  [
    { type: "none" },
    { type: "none" },
    { type: "char", value: "y" },
    { type: "char", value: "p" },
    { type: "char", value: "s" },
    { type: "char", value: "c" },
    { type: "char", value: "k" },
    { type: "none" },
    { type: "none" },
  ]
);


textKeys.push(
  [
    { type: "none" },
    { type: "none" },
    { type: "none" },
    { type: "char", value: "j" },
    { type: "char", value: "i" },
    { type: "char", value: "f" },
    { type: "none" },
    { type: "none" },
    { type: "none" },
  ]
);

export { textKeys };
export default textKeys;