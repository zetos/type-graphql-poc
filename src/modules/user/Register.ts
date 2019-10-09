import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from 'bcryptjs';

import { User } from "../../entity/User";

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return 'Hello World Resolver'
    }

    @Mutation(() => User)
    async register(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
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