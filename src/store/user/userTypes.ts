import { StringMappingType } from "typescript"

export type User = {
    username: string,
    _id: string,
    reviews: String[],
    avatar: string,
    email: string,
    password: string,
}