import { ConfigRootState } from "@stores/config-store";
import { CalculatorProfile } from "@stores/profile";
import FileSaver from "file-saver";
import { useSelector } from "react-redux";

function saveFile(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, filename);
}

export default function useDownloadProfile() {
  const settings = useSelector((state: ConfigRootState) => state.settings);
  const features = useSelector(
    (state: ConfigRootState) => state.engineFeatures
  );

  const profile: CalculatorProfile = {
    features,
    settings,
  };

  return () =>
    saveFile(JSON.stringify(profile, null, 2), "arithmico-profile.json");
}
