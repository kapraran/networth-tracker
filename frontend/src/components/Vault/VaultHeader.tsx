import { Button } from "@fluentui/react-components";
import {
  ChevronDown16Filled,
  ChevronUp16Filled,
  Edit12Filled,
} from "@fluentui/react-icons";
import { MutableRefObject, useRef, useState } from "react";
import { useVaultState } from "../../state";
import { formatCurrency } from "../../utils";
import { Row } from "../common";
import { VaultData } from "./Vault";
import { VaultAvatar } from "./VaultAvatar";

interface Props {
  vault: VaultData;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VaultHeader({ vault, expanded, setExpanded }: Props) {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [isEditMode, setIsEditMode] = useState(false);
  const enableNameEdit = () => {
    setIsEditMode(true);
    inputRef.current?.focus();
  };

  const amount = vault.money?.[0]?.amount || 0;

  const updateVault = useVaultState((state) => state.updateVault);

  return (
    <Row gap="1rem">
      <VaultAvatar name={vault.name} size={32} />

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
          width: `${(vault.name.length || 0) + 1}ch`,
        }}
        onDoubleClick={() => setIsEditMode(true)}
        value={vault.name}
        onChange={(e) => updateVault(vault.id, { name: e.target.value })}
        onKeyUp={(e) => {
          if (e.key === "Enter") setIsEditMode(false);
        }}
        readOnly={!isEditMode}
        onBlur={() => setIsEditMode(false)}
      />

      {!isEditMode && (
        <Button
          appearance="transparent"
          icon={<Edit12Filled />}
          onClick={enableNameEdit}
        />
      )}

      <div style={{ flex: 1, textAlign: "right" }}>
        {formatCurrency(amount, "€")}
      </div>

      <Button
        onClick={() => setExpanded((p) => !p)}
        icon={!expanded ? <ChevronDown16Filled /> : <ChevronUp16Filled />}
      />
    </Row>
  );
}
