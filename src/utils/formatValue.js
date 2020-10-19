import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/pt-BR";

if (Platform.OS === "android") {
    if (typeof (Intl).__disableRegExpRestore === "function") {
        (Intl).__disableRegExpRestore();
    }
}

const formatValue = (value) =>
  Intl.NumberFormat('pt-BR', {
    style: 'decimal',
  }).format(value);

export default formatValue;
