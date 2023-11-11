import { Button } from "@fluentui/react-components";
import { ChevronDown16Filled, ChevronUp16Filled } from "@fluentui/react-icons";
import { MutableRefObject, useRef, useState } from "react";
import { formatCurrency } from "../../utils";
import { Row } from "../common";
import { VaultAvatar } from "./VaultAvatar";

export function VaultHeader({
  name,
  money,
  expanded,
  setExpanded,
  setName,
}: {
  name: string;
  money: number;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [isEditMode, setIsEditMode] = useState(false);
  const enableNameEdit = () => {
    setIsEditMode(true);
    inputRef.current?.focus();
  };

  return (
    <Row gap="1rem">
      <VaultAvatar name={name} size={24} />

      {/* <div style={{ fontSize: "14px" }}>{name}</div> */}
      <input
        ref={inputRef}
        type="text"
        style={{
          border: "none",
          padding: 0,
          margin: 0,
          background: "transparent",
          color: "white",
          outline: "none",
        }}
        onDoubleClick={() => setIsEditMode(true)}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") setIsEditMode(false);
        }}
        readOnly={!isEditMode}
        onBlur={() => setIsEditMode(false)}
      />
      {!isEditMode && (
        <Button
          appearance="transparent"
          icon={<ChevronDown16Filled />}
          onClick={enableNameEdit}
        />
      )}

      <div style={{ flex: 1, textAlign: "right" }}>
        {formatCurrency(money, "€")}
      </div>

      <Button
        onClick={() => setExpanded((p) => !p)}
        icon={!expanded ? <ChevronDown16Filled /> : <ChevronUp16Filled />}
      />
    </Row>
  );
}
