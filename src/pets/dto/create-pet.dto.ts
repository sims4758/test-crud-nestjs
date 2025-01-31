import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreatePetDto {
    @IsString()
    petName: string;

    @IsNumber()
    petAge: number;

    @IsString()
    petSex: string;

    @IsOptional() // เปลี่ยนเป็น UploadedFile
    petPicture: string; // ระบุ type เป็น Express.Multer.File
}