import uniqolor from "uniqolor";

interface Props {
  name: string;
  size: number;
  style?: React.CSSProperties;
}

export function VaultAvatar({ name, size, style }: Props) {
  const color = uniqolor(name);
  const bgColor = color.color;
  const fontColor = color.isLight ? "#000" : "#fff";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        textAlign: "center",
        backgroundColor: bgColor,
        color: fontColor,
        fontSize: "10px",
        lineHeightStep: "10px",
        fontWeight: "bold",
        userSelect: "none",
        ...(style || {}),
      }}
    >
      {name
        .split(" ")
        .map((item) => item.slice(0, 1))
        .join("")
        .trim()
        .toUpperCase()}
    </div>
  );
}
