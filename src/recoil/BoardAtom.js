import { atom } from "recoil";

export const BoardAtom = atom({
    key: "BoardAtom",
    default: {}
});

export const PagingAtom = atom({
    key: "PagingAtom",
    default: {
        number: 1,
        totalPages: 1,
      },
});

export const ModalAtom = atom({
    key: "ModalAtom",
    default: false
});

export const ModalDetailAtom = atom({
    key: "ModalDetailAtom",
    default: false
});

export const BoardDetailAtom = atom({
    key: "BoardDetailAtom",
    default: {
        id: '',
        title: '',
        content: ''
    }
});

export const ModalUpdateAtom = atom({
    key: "ModalUpdateAtom",
    default: false
})