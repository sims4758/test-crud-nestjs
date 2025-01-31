import { IsOptional, IsString } from "class-validator";

export class CreateFileDto {
    @IsString()
    @IsOptional()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsString()
    @IsOptional()
    readonly file: string;
}