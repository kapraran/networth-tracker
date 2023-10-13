import { useState } from "react";
import styled from "styled-components";
import { OpenJsonFile } from "../wailsjs/go/main/App.js";
import { Chart } from "./Chart.js";
import { Vault, VaultData } from "./Vault";
import { formatCurrency } from "./utils";

const VaultList = styled.div`
  padding: 16px;
`;

function App() {
  const [vaults, setVaults] = useState<VaultData[]>([]);

  const openFile = () =>
    OpenJsonFile().then((str) => setVaults(JSON.parse(str)));

  return (
    <div id="App">
      <button onClick={openFile}>New File</button>
      <button onClick={openFile}>Open File</button>

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
