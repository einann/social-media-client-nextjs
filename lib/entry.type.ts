import { UserType } from "./user.type";

export type EntryType = {
    entryId: string,
    content: string,
    createDate: string,
    createDate_parsed: string,
    createTime: string,
    createTime_parsed: string,
    createdUser: string | UserType,
    active: 'true' | 'false',
    contentImage: string,
    likes: [],
}