import { useEffect, useState } from "react";

type AccentColorOptionProps = {
  value: string;
  selected: boolean;
  onSelect: (color: string) => void;
};
export function AccentColorOption(props: AccentColorOptionProps) {
  return (
    <div
      style={{
        backgroundColor: props.value,
      }}
      className={` w-[25px] h-[25px] cursor-pointer bg-black rounded-full m-1 inline-block border-2 border-zinc-400 ${
        props.selected
          ? "outline-3 outline-offset-2 outline-zinc-500 outline"
          : ""
      }`}
      onClick={() => props.onSelect(props.value)}
    ></div>
  );
}

const affectedCSSVars: string[] = [
  "--adaptable-color-accent",
  "--infinite-resize-handle-hover-background",
];

export function AccentColorPicker() {
  const defaultValue = "#07c";
  const [accentColor, setAccentColor] = useState<string>(defaultValue);

  const colorOptions = [
    defaultValue, // default value
    "#fb923c",
    "#a3e635",
    "#22d3ee",
    "#fb7185",
    "#6366f1",
  ];

  const update = (color: string) => {
    affectedCSSVars.forEach((cssVar) => {
      document.documentElement.style.setProperty(cssVar, color);
    });

    setAccentColor(color);
  };

  useEffect(() => {
    update(defaultValue);
  }, []);
  return (
    <div className="flex flex-col">
      <div
        className="font-medium text-xs opacity-70"
        style={{
          color: "var(--adaptable-color-accent)",
        }}
      >
        Accent color
      </div>
      <div>
        {colorOptions.map((color) => {
          return (
            <AccentColorOption
              key={color}
              value={color}
              selected={accentColor === color}
              onSelect={update}
            />
          );
        })}
      </div>
    </div>
  );
}
