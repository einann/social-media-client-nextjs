import { UserType } from "./user.type";

export type CommentType = {
    commentId: string,
    content: string,
    createDate: string,
    createDate_parsed: string,
    createTime: string,
    createTime_parsed: string,
    createdUser: string | UserType,
    active: 'true' | 'false',
    likes: [],
}