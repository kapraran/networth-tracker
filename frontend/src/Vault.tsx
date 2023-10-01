import styled from "styled-components";
import { VaultAvatar } from "./VaultAvatar";
import { formatCurrency } from "./utils";

interface Props {
  name: string;
  money: number;
}

const VaultWrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.145);
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
`;

function VaultHeader({ name, money }: { name: string; money: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <VaultAvatar
        name={name}
        size={24}
        style={{
          marginRight: "8px",
        }}
      />
      <div style={{ fontSize: "14px" }}>{name}</div>
      <div style={{ flex: 1, textAlign: "right" }}>
        {formatCurrency(money, "€")}
      </div>
    </div>
  );
}

export function Vault({ name, money }: Props) {
  return (
    <VaultWrapper className="vault-component">
      <VaultHeader name={name} money={money} />
    </VaultWrapper>
  );
}
