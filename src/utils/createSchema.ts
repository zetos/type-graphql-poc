import { buildSchema } from "type-graphql";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import { LoginResolver } from "../modules/user/Login";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { LogoutResolver } from "../modules/user/Logout";
import { CreateUserResolver } from "../modules/user/CreateUser";
import { ProfilePictureResolver } from "../modules/user/ProfilePicture";

export const createSchema = () => buildSchema({
    resolvers: [
        MeResolver,
        RegisterResolver,
        LoginResolver,
        ConfirmUserResolver,
        LogoutResolver,
        CreateUserResolver,
        ProfilePictureResolver
    ],
    authChecker: ({ context: { req } }) => {
        return !!req.session.userId;
    }
})
