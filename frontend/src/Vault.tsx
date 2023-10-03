import styled from "styled-components";
import { VaultAvatar } from "./VaultAvatar";
import { formatCurrency } from "./utils";

export interface VaultMoneyData {
  amount: number;
  datetime: string;
}

export interface VaultData {
  name: string;
  money: VaultMoneyData[];
}

interface Props {
  vault: VaultData;
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

export function Vault({ vault }: Props) {
  return (
    <VaultWrapper className="vault-component">
      <VaultHeader name={vault.name} money={vault.money[0].amount} />
      <div>
        {vault.money.map((item) => (
          <div>{item.amount}</div>
        ))}
      </div>
    </VaultWrapper>
  );
}
