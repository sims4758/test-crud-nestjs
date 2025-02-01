import { IsEmail, IsString } from "class-validator";

export class EmailDto {
    @IsEmail()
    recipient: string;

    @IsString()
    subject: string;

    @IsString()
    html: string;

    @IsString()
    text: string;
}