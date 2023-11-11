import { Button } from "@fluentui/react-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency } from "../utils.js";
import { Chart } from "./Chart.js";
import { Vault, VaultData } from "./Vault/Vault.js";

const VaultList = styled.div`
  padding: 16px;
`;

function Dashboard() {
  const location = useLocation();

  const [vaults, setVaults] = useState<VaultData[]>(
    location.state.vaults || []
  );

  return (
    <div id="App">
      <div
        style={{
          height: "200px",
        }}
      >
        <Chart />
      </div>

      <div
        style={{
          fontSize: "48px",
          padding: "16px",
          textAlign: "center",
        }}
      >
        {formatCurrency(
          vaults.reduce((acc, { money }) => acc + (money?.[0]?.amount || 0), 0),
          "€"
        )}
      </div>

      <div
        style={{
          padding: "16px 16px 0 16px",
        }}
      >
        <Button
          onClick={() => {
            setVaults((existing) => [
              ...existing,
              {
                name: "New Vault",
                money: [],
              },
            ]);
          }}
        >
          Add New Vault
        </Button>
      </div>

      <VaultList>
        {vaults.map((vault) => (
          <Vault key={vault.name} vault={vault} />
        ))}
      </VaultList>
    </div>
  );
}

export default Dashboard;
