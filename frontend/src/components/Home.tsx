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
          marginBottom: "16px",
        }}
      >
        PLOUTOS
      </div>

      <div
        style={{
          fontSize: "12px",
          width: "80dvw",
          maxWidth: "500px",
          textAlign: "center",
          marginBottom: "16px",
          color: "#797979",
        }}
      >
        In Greek mythology, Ploutos (Πλοῦτος in Greek) is associated with wealth
        and prosperity. The word itself is Greek, and it reflects the concept of
        wealth, affluence, or abundance.
      </div>

      <Stack direction="row" gap="1rem" verticalSpacing="8px" center>
        <Button onClick={newFile}>New File</Button>
        <Button onClick={openFile}>Open File</Button>
      </Stack>
    </Col>
  );
}
