import { atom } from "recoil"


export const modelState = atom({
    key: "modelState",
    default: false,
});

export const PostIdState = atom({
    key: "PostIdState",
    default: "",
});

export const ProfileState = atom({
    key: "ProfileState",
    default: false,
})

export const TweetPageState = atom({
    key: "TweetPageState",
    default: false,
})
