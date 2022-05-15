import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const currPageAtom = atom({ // keeping track of current page 
  key: 'currPage',
  default: 'Home' as string,
  effects_UNSTABLE: [persistAtom]
})

export const currUserAtom = atom({ // global user state
  key: 'currUser',
  default: '' as string ,
  effects_UNSTABLE: [persistAtom]
})

export const navOpenAtom = atom({ // to close and open modal on certain events
  key: 'modalOpen',
  default: false as boolean,
  effects_UNSTABLE: [persistAtom]
})