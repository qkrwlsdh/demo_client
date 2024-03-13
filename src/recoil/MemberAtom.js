import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const loginIdAtom = atom({
    key: "loginIdAtom",
    default: "",
});
export const loginPwAtom = atom({
    key: "loginPwAtom",
    default: ""
});
export const tokenAtom = atom({
    key: "token",
    default: ""
});
export const modalIsOpenAtom = atom({
    key: "modalIsOpen",
    default: false
});
export const responseDataAtom = atom({
    key: "responseData",
    default: {}
});