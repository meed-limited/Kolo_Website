import { createState, useState } from "@hookstate/core";

const state = createState({
  isAuth: false,
  openConnectModal: false,
  openSubmissionModal: false,
  showConnectModalAnimation: true
});

export default function useStateManager() {
  return useState(state);
}
