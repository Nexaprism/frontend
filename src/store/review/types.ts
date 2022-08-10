import { User } from "../user/userTypes";

export type Review = {
    _id: string;
    rating: number;
    user: User;
    content: string;
    productName: string;
    productId: string;
    createdAt: string;
}