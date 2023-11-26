import {
  Divider,
  Dropdown,
  Input,
  Option,
  Subtitle2Stronger,
  Switch,
  Text,
} from "@fluentui/react-components";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useVaultState } from "../../state";
import { Col, Row } from "../common";
import { VaultHeader } from "./VaultHeader";
import { VaultTransactions } from "./VaultTransactions";

const VaultWrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.05);
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

export interface VaultData {
  id: string;
  name: string;
  money: { amount: number; datetime: string }[];
  increments?: {
    fixed?: { amount: number; interval: string };
    percentage?: { amount: number; interval: string };
    extrapolation?: boolean;
  };
}
interface Props {
  vault: VaultData;
}

export function Vault({ vault }: Props) {
  const [expanded, setExpanded] = useState(false);

  const updateVault = useVaultState((state) => state.updateVault);

  // fixed amount
  const [enableFixed, setEnableFixed] = useState(!!vault.increments?.fixed);
  const fixedAmount = vault?.increments?.fixed?.amount || 0;
  const fixedInterval =
    vault?.increments?.fixed?.interval || FIXED_INTERVAL.DAILY;

  const setFixedAmount = (amount: number) =>
    updateVault(vault.id, {
      increments: {
        ...(vault.increments || {}),
        fixed: {
          amount,
          interval: fixedInterval,
        },
      },
    });

  const setFixedInterval = (interval: string) =>
    updateVault(vault.id, {
      increments: {
        ...(vault.increments || {}),
        fixed: {
          amount: fixedAmount,
          interval,
        },
      },
    });

  // interest amount
  const [enableInterest, setEnableInterest] = useState(false);
  const [interestAmount, setInterestAmount] = useState(0);
  const [interestInterval, setInterestInterval] = useState<string>(
    FIXED_INTERVAL.DAILY
  );

  // const [enableInfer, setEnableInfer] = useState(false);

  const handleInputChange = (
    setter: Dispatch<SetStateAction<number>>,
    value: string
  ) => {
    setter(isNaN(parseFloat(value)) ? 0 : parseFloat(value));
  };

  const handleSwitchChange = (
    setter: Dispatch<SetStateAction<boolean>>,
    checked: boolean
  ) => {
    setter(checked);
  };

  return (
    <VaultWrapper className="vault-component">
      <VaultHeader
        vault={vault}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      {expanded && (
        <div>
          <Divider style={{ paddingTop: "12px", paddingBottom: "12px" }} />

          <Row>
            <Col
              style={{
                width: "40%",
                alignItems: "flex-start",
              }}
            >
              <VaultTransactions vault={vault} />
            </Col>

            <Col
              style={{
                width: "60%",
                alignItems: "flex-start",
              }}
            >
              <Subtitle2Stronger>Portfolio Growth</Subtitle2Stronger>

              <Row gap="1rem">
                <Switch
                  label="Fixed Amount"
                  checked={enableFixed}
                  onChange={(_, d) =>
                    handleSwitchChange(setEnableFixed, d.checked)
                  }
                />

                {enableFixed && (
                  <>
                    <Input
                      input={{
                        style: {
                          width: "70px",
                        },
                      }}
                      type="number"
                      min="0"
                      value={fixedAmount.toString()}
                      onChange={(_, d) => setFixedAmount(parseFloat(d.value))}
                    />

                    <Dropdown
                      onOptionSelect={(_, d) =>
                        setFixedInterval(d.optionValue!)
                      }
                      value={fixedInterval}
                      style={{ minWidth: "auto", width: "120px" }}
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
                  onChange={(_, d) =>
                    handleSwitchChange(setEnableInterest, d.checked)
                  }
                />

                {enableInterest && (
                  <>
                    <Input
                      input={{
                        style: {
                          width: "70px",
                        },
                      }}
                      type="number"
                      min="0"
                      step="0.5"
                      value={interestAmount.toString()}
                      contentAfter={<Text size={400}>%</Text>}
                      onChange={(_, d) =>
                        handleInputChange(setInterestAmount, d.value)
                      }
                    />

                    <Dropdown
                      onOptionSelect={(_, d) =>
                        setInterestInterval(d.optionValue!)
                      }
                      value={interestInterval}
                      style={{ minWidth: "auto", width: "120px" }}
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

              {/* <Row gap="1rem">
  <Switch
    label="Infer from data"
    checked={enableInfer}
    onChange={(_, d) => handleSwitchChange(setEnableInfer, d.checked)}
  />
</Row> */}
            </Col>
          </Row>
        </div>
      )}
    </VaultWrapper>
  );
}

export default Vault;
