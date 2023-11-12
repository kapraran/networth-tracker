import { create } from "zustand";
import { VaultData } from "./components/Vault/Vault";
import { debounce } from "./utils";

interface VaultStateType {
  vaults: VaultData[];
  setVaults: (vaults: VaultData[]) => void;
  updateVault: (id: string, data: Partial<VaultData>) => void;
}

const persistVaults = debounce((vaults: VaultData[]) => {
  console.log("called persistVaults with ", vaults);
}, 1000);

export const useVaultState = create<VaultStateType>((set, get) => ({
  vaults: [],
  setVaults: (vaults) => {
    set((state) => ({ ...state, vaults }));
    persistVaults(vaults);
  },
  updateVault: (id, data) => {
    const vaults = get().vaults;
    const vaultIndex = vaults.findIndex((v) => v.id === id);
    if (vaultIndex === undefined) return;

    vaults[vaultIndex] = { ...vaults[vaultIndex], ...data };

    get().setVaults([...vaults]);
  },
}));
