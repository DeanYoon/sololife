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

// export const UserData = atom<IUserData>({
//   key: "UserData",
//   default: {
//     id: 0,
//     email: "",
//     nickname: "",
//     profile_image: "",
//   },
//   effects_UNSTABLE: [persistAtom],
// });
