import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import bcrypt from 'bcryptjs';

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
    @Authorized()
    @Query(() => String)
    async hello() {
        return 'Hello World Resolver'
    }

    @Mutation(() => User)
    async register(
        @Arg('data') {email, firstName, lastName, password}: RegisterInput,
    ): Promise<User> {
        const hashedPwd = await bcrypt.hash(password, 13);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPwd
        }).save();

        return user
    }
}