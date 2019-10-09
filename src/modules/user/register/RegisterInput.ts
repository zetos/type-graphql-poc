import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExists";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 30)
    firstName: string;
    
    @Field()
    @Length(1, 200)
    lastName: string;
    
    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message: 'email already in use'})
    email: string;
    
    @Field()
    password: string;
}
