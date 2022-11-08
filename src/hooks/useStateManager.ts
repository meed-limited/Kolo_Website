import { createState, useState } from "@hookstate/core";

const state = createState({
  isAuth: true,
  openConnectModal: false,
  openSubmissionModal: false,
});

export default function useStateManager() {
  return useState(state);
}