import { CSSProperties } from "react";

export interface AddressProps {
  style: CSSProperties | undefined;
  avatar: string;
  size: number | undefined;
  copyable: boolean;
  account: string;
}
