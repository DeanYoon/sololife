import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const hideBackground = atom({
  key: "hideBackground",
  default: false,
});

export const loginState = atom({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

interface UserData {
  username: string;
}
export const UserData = atom<UserData>({
  key: "UserData",
  default: {
    username: "",
  },
  effects_UNSTABLE: [persistAtom],
});
