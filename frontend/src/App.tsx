import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Chart } from "./Chart.js";
import { Vault, VaultData } from "./Vault";
import { formatCurrency } from "./utils";

const VaultList = styled.div`
  padding: 16px;
`;

function App() {
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
          vaults.reduce((acc, { money }) => acc + money[0].amount, 0),
          "€"
        )}
      </div>
      <VaultList>
        {vaults.map((vault) => (
          <Vault key={vault.name} vault={vault} />
        ))}
      </VaultList>
    </div>
  );
}

export default App;
