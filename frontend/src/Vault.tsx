import {
  Button,
  Divider,
  Dropdown,
  Input,
  Option,
  Subtitle2Stronger,
  Switch,
} from "@fluentui/react-components";
import { ChevronDown16Filled, ChevronUp16Filled } from "@fluentui/react-icons";
import { useState } from "react";
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
  expanded,
  setExpanded,
}: {
  name: string;
  money: number;
  expanded: boolean;
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

      <Button
        onClick={() => setExpanded((p) => !p)}
        icon={!expanded ? <ChevronDown16Filled /> : <ChevronUp16Filled />}
      />
    </div>
  );
}

enum FIXED_INTERVAL {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export function Vault({ vault }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [fixedInterval, setFixedInterval] = useState<string>(
    FIXED_INTERVAL.DAILY
  );
  const [fixedAmount, setFixedAmount] = useState(0);
  const [enableFixed, setEnableFixed] = useState(false);

  return (
    <VaultWrapper className="vault-component">
      <VaultHeader
        name={vault.name}
        money={vault.money[0].amount}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      {expanded && (
        <div>
          {vault.money.map((item) => (
            <div>{item.amount}</div>
          ))}

          <Subtitle2Stronger>Portfolio Growth</Subtitle2Stronger>
          <Divider />

          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              label="Fixed Amount"
              checked={enableFixed}
              onChange={(_, d) => setEnableFixed(d.checked)}
            />

            {enableFixed && (
              <>
                <Input
                  type="number"
                  value={fixedAmount.toString()}
                  onChange={(_, d) => {
                    d.value;
                    setFixedAmount(
                      isNaN(parseInt(d.value)) ? 0 : parseInt(d.value)
                    );
                  }}
                />

                <Dropdown
                  placeholder="Select an animal"
                  onOptionSelect={(_, d) => setFixedInterval(d.optionValue!)}
                  value={fixedInterval}
                >
                  {Object.values(FIXED_INTERVAL).map((key) => (
                    <Option key={key} value={key}>
                      {key}
                    </Option>
                  ))}
                </Dropdown>
              </>
            )}
          </div>
        </div>
      )}
    </VaultWrapper>
  );
}
