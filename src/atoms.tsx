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
  id: string;
  username: string;
  userEmail: string;
  profileImg: string;
}
export const UserData = atom<UserData>({
  key: "UserData",
  default: {
    id: "",
    username: "",
    userEmail: "",
    profileImg: "",
  },
  effects_UNSTABLE: [persistAtom],
});
