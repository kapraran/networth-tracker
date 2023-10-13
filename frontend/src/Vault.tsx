import { useState } from "react";
import styled from "styled-components";
import { LogPrint } from "../wailsjs/runtime/runtime";
import { VaultAvatar } from "./VaultAvatar";
import { formatCurrency } from "./utils";

export interface VaultMoneyData {
  amount: number;
  datetime: string;
}

export interface VaultData {
  name: string;
  money: VaultMoneyData[];
  increments?: {
    fixed?: {
      amount: number;
      interval: string;
    };
    percentage?: {
      amount: number;
      interval: string;
    };
  };
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

function VaultHeader({
  name,
  money,
  setExpanded,
}: {
  name: string;
  money: number;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      <button onClick={() => setExpanded((p) => !p)}>+</button>
    </div>
  );
}

enum FIXED_INTERVAL {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

// const fixedIntervalLabels = [
//   { name: "Daily", value: FIXED_INTERVAL.DAILY },
//   { name: "Weekly", value: FIXED_INTERVAL.WEEKLY },
//   { name: "Monthly", value: FIXED_INTERVAL.MONTHLY },
//   { name: "Yearly", value: FIXED_INTERVAL.YEARLY },
// ];

export function Vault({ vault }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [fixedInterval, setFixedInterval] = useState<string>(
    FIXED_INTERVAL.DAILY
  );
  const [fixedAmount, setFixedAmount] = useState(0);

  LogPrint(fixedInterval);

  return (
    <VaultWrapper className="vault-component">
      <VaultHeader
        name={vault.name}
        money={vault.money[0].amount}
        setExpanded={setExpanded}
      />
      {expanded && (
        <div>
          {vault.money.map((item) => (
            <div>{item.amount}</div>
          ))}

          <input
            type="number"
            value={fixedAmount}
            onChange={(e) =>
              setFixedAmount(
                isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
              )
            }
          />

          <select
            value={fixedInterval}
            onChange={(e) => setFixedInterval(e.target.value)}
          >
            {Object.values(FIXED_INTERVAL).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      )}
    </VaultWrapper>
  );
}
