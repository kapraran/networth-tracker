import { Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { CreateNewJsonFile, OpenJsonFile } from "../../wailsjs/go/main/App.js";
import logoWhitePng from "../assets/logo_white.png";
import { VaultData } from "./Vault/Vault.js";
import { Col, Stack } from "./common.js";

export default function Home() {
  const navigate = useNavigate();

  const newFile = async () => {
    try {
      const filePath = await CreateNewJsonFile();
      console.log(filePath);
    } catch (error) {
      console.error(error);
    }
  };

  const openFile = async () => {
    const contents = await OpenJsonFile();
    const vaults: VaultData[] = JSON.parse(contents);

    navigate("/dashboard", {
      state: { vaults },
    });
  };

  return (
    <Col style={{ height: "100dvh" }}>
      <img
        src={logoWhitePng}
        style={{
          maxWidth: "30dvh",
        }}
      />

      <div
        style={{
          fontFamily: "monospace",
          letterSpacing: "5px",
          textTransform: "uppercase",
          fontSize: "20px",
          marginBottom: "32px",
        }}
      >
        PLOUTOS
      </div>

      <Stack direction="row" gap="1rem" verticalSpacing="8px" center>
        <Button onClick={newFile}>New File</Button>
        <Button onClick={openFile}>Open File</Button>
      </Stack>
    </Col>
  );
}
