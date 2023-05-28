import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const widthSize = atom({
  key: "widthSize",
  default: window.innerWidth,
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
