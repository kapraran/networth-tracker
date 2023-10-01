import styled from "styled-components";
import { Vault } from "./Vault";
import { formatCurrency } from "./utils";

const VaultList = styled.div`
  padding: 16px;
`;

interface VaultData {
  name: string;
  money: number;
}

const vaults: VaultData[] = [
  { name: "Trade Republic", money: 3000 },
  { name: "Unicredit", money: 1000000 },
  { name: "Eurobank", money: 2000 },
  { name: "Binance", money: 420 },
];

function App() {
  return (
    <div id="App">
      <div
        style={{
          fontSize: "48px",
          padding: "16px",
          textAlign: "center",
        }}
      >
        {formatCurrency(
          vaults.reduce((acc, { money }) => acc + money, 0),
          "€"
        )}
      </div>

      <VaultList>
        {vaults.map(({ name, money }) => (
          <Vault key={name} name={name} money={money} />
        ))}
      </VaultList>
    </div>
  );
}

export default App;
