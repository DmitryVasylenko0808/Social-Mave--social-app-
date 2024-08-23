import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { Comment } from "./comment.schema";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
    @Prop({ required: true })
    text: string;

    @Prop()
    images?: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    author: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    likes: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    reposts: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    bookmarks: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]})
    comment: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);