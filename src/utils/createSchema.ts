import { buildSchema } from "type-graphql";

// resolvers: [MeResolver, RegisterResolver, LoginResolver, ConfirmUserResolver, LogoutResolver],

export const createSchema = () => buildSchema({
    resolvers: [__dirname + '/../modules/*/*.ts'],
    authChecker: ({context: {req}}) => {
        return !!req.session.userId;
    }
})