import { atom, selector } from "recoil";

const notiState = atom({
  key: "notiState",
  default: [],
});

const unreadNotiState = selector({
  key: "unreadNotiState",
  get: ({ get }) => {
    const list = get(notiState);

    return list.filter((item) => {
      return item.unread;
    });
  },
});

export { notiState, unreadNotiState };
