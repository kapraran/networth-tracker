import {
  Divider,
  Dropdown,
  Input,
  Option,
  Subtitle2Stronger,
  Switch,
  Text,
} from "@fluentui/react-components";
import { useState } from "react";
import styled from "styled-components";
import { Row } from "../common";
import { VaultHeader } from "./VaultHeader";

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
    extrapolation: boolean;
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

enum FIXED_INTERVAL {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export function Vault({ vault }: Props) {
  const [expanded, setExpanded] = useState(false);

  const [enableFixed, setEnableFixed] = useState(false);
  const [fixedAmount, setFixedAmount] = useState(0);
  const [fixedInterval, setFixedInterval] = useState<string>(
    FIXED_INTERVAL.DAILY
  );

  const [enableInterest, setEnableInterest] = useState(false);
  const [interestAmount, setInterestAmount] = useState(0);
  const [interestInterval, setInterestInterval] = useState<string>(
    FIXED_INTERVAL.DAILY
  );

  const [enableInfer, setEnableInfer] = useState(false);
  const [name, setName] = useState(vault.name);

  return (
    <VaultWrapper className="vault-component">
      <VaultHeader
        name={name}
        money={vault.money?.[0]?.amount || 0}
        expanded={expanded}
        setExpanded={setExpanded}
        setName={setName}
      />
      {expanded && (
        <div>
          <Divider
            style={{
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          />

          {/* {vault.money.map((item) => (
            <div>{item.amount}</div>
          ))} */}

          <Subtitle2Stronger>Portfolio Growth</Subtitle2Stronger>

          <Row gap="1rem">
            <Switch
              label="Fixed Amount"
              checked={enableFixed}
              onChange={(_, d) => setEnableFixed(d.checked)}
            />

            {enableFixed && (
              <>
                <Input
                  type="number"
                  min="0"
                  value={fixedAmount.toString()}
                  onChange={(_, d) => {
                    d.value;
                    setFixedAmount(
                      isNaN(parseInt(d.value)) ? 0 : parseInt(d.value)
                    );
                  }}
                />

                <Dropdown
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
          </Row>

          <Row gap="1rem">
            <Switch
              label="Interest"
              checked={enableInterest}
              onChange={(_, d) => setEnableInterest(d.checked)}
            />

            {enableInterest && (
              <>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={interestAmount.toString()}
                  contentAfter={<Text size={400}>%</Text>}
                  onChange={(_, d) => {
                    d.value;
                    setInterestAmount(
                      isNaN(parseFloat(d.value)) ? 0 : parseFloat(d.value)
                    );
                  }}
                />

                <Dropdown
                  onOptionSelect={(_, d) => setInterestInterval(d.optionValue!)}
                  value={interestInterval}
                >
                  {Object.values(FIXED_INTERVAL).map((key) => (
                    <Option key={key} value={key}>
                      {key}
                    </Option>
                  ))}
                </Dropdown>
              </>
            )}
          </Row>

          <Row gap="1rem">
            <Switch
              label="Infer from data"
              checked={enableInfer}
              onChange={(_, d) => setEnableInfer(d.checked)}
            />
          </Row>
        </div>
      )}
    </VaultWrapper>
  );
}
