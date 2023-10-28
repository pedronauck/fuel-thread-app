import { Address } from "fuels";

export function shortAddress(
  address: string = "",
  trimLeft = 14,
  trimRight = 14,
) {
  const bech32 = Address.fromB256(address).toString();
  return bech32.length > 10
    ? `${bech32.slice(0, trimLeft)}...${bech32.slice(-trimRight)}`
    : bech32;
}
