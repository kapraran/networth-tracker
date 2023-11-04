import { Button } from "@fluentui/react-components";
import { ChevronDown16Filled, ChevronUp16Filled } from "@fluentui/react-icons";
import { formatCurrency } from "../../utils";
import { Row } from "../common";
import { VaultAvatar } from "./VaultAvatar";

export function VaultHeader({
  name, money, expanded, setExpanded,
}: {
  name: string;
  money: number;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Row gap="1rem">
      <VaultAvatar name={name} size={24} />

      <div style={{ fontSize: "14px" }}>{name}</div>
      <div style={{ flex: 1, textAlign: "right" }}>
        {formatCurrency(money, "€")}
      </div>

      <Button
        onClick={() => setExpanded((p) => !p)}
        icon={!expanded ? <ChevronDown16Filled /> : <ChevronUp16Filled />} />
    </Row>
  );
}
