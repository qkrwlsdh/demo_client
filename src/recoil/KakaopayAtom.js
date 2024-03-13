import { atom } from 'recoil';
import {recoilPersist} from 'recoil-persist'

// 아무것도 설정하지 않고 쓰는 경우 localStorage에 저장되며, key이름은 'recoil-persist'로 저장된다.
const {persistAtom} = recoilPersist();

export const cidAtom = atom({
    key: "cidAtom",
    default: "TC0ONETIME"
});
export const tidAtom = atom({
    key: "tidAtom",
    default: "",
    effects_UNSTABLE: [persistAtom],    // 새로고침 되어도 유지
});
export const pgTokenAtom = atom({
    key: "pgTokenAtom",
    default: ""
});
export const authorizationAtom = atom({
    key: "authorizationAtom",
    default: "SECRET_KEY DEVD194324797E1AA50D3114E5143C2AA1609D4C"
});