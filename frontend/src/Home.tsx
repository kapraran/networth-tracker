import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { OpenJsonFile } from "../wailsjs/go/main/App.js";
import { VaultData } from "./Vault";
import logoWhitePng from "./assets/logo_white.png";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  flex-direction: column;
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
      <img
        src={logoWhitePng}
        style={{
          maxWidth: "30dvh",
        }}
      />

      <Button onClick={openFile}>Open File</Button>
    </Center>
  );
}
