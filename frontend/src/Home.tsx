import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { OpenJsonFile } from "../wailsjs/go/main/App.js";
import { VaultData } from "./Vault";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
`;

export default function Home() {
  const navigate = useNavigate();

  const openFile = () =>
    OpenJsonFile().then((str) => {
      const vaults: VaultData[] = JSON.parse(str);

      navigate("/dashboard", {
        state: {
          vaults,
        },
      });
    });

  return (
    <Center>
      <Button onClick={openFile}>Open File</Button>
    </Center>
  );
}
