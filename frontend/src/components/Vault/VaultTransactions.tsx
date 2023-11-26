import { Button, Input, Text } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Add24Filled, Delete16Regular } from "@fluentui/react-icons";
import { DateTime } from "luxon";
import { useVaultState } from "../../state";
import { VaultData } from "./Vault";

interface Props {
  vault: VaultData;
}

export function VaultTransactions({ vault }: Props) {
  const updateVault = useVaultState((state) => state.updateVault);

  return (
    <ul
      style={{
        width: "100%",
        paddingRight: "16px",
      }}
    >
      <li>
        <Button
          onClick={() => {
            updateVault(vault.id, {
              money: [
                {
                  amount: 0,
                  datetime: DateTime.now().toISO()!,
                },
                ...vault.money,
              ],
            });
          }}
          icon={<Add24Filled />}
        />
      </li>

      {vault.money.map((m, i) => {
        const dt = DateTime.fromISO(m.datetime);

        return (
          <li
            key={`${i}-${m.datetime}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px 0",
            }}
          >
            <div className="datetime">
              <DatePicker
                placeholder="Select a date..."
                value={dt.toJSDate()}
                onSelectDate={(d) => {
                  if (!d) return;
                  const dt = DateTime.fromJSDate(d);
                  dt.toISO();

                  const updatedMoney = [...vault.money];
                  updatedMoney[i] = {
                    ...updatedMoney[i],
                    datetime: dt.toISO()!,
                  };

                  updateVault(vault.id, {
                    ...vault,
                    money: updatedMoney,
                  });
                }}
              />
            </div>

            <div className="amount">
              <Input
                contentBefore={<Text size={400}>€</Text>}
                value={m.amount.toString()}
                type="number"
                onChange={(_, { value }) => {
                  const money = [...vault.money];
                  money[i] = {
                    ...money[i],
                    amount: parseFloat(value),
                  };

                  return updateVault(vault.id, { money });
                }}
              />
            </div>

            <div className="remove">
              <Button
                onClick={() => {
                  vault.money.splice(i, 1);

                  updateVault(vault.id, {
                    ...vault,
                    money: [...vault.money],
                  });
                }}
                icon={<Delete16Regular />}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
