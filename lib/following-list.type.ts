import { UserType } from "./user.type"

export type FollowingListType = {
    isFollowedByMe: boolean | undefined;
    id: string,
    createDate: string,
    createTime: string,
    following: UserType,
}

export type FollowerListType = {
    isFollowedByMe: boolean | undefined;
    id: string,
    createDate: string,
    createTime: string,
    follower: UserType,
}