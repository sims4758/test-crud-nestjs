import { BadRequestException } from '@nestjs/common';

export const fileNameEditor = (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    const newFilename = `${Date.now()}-${file.originalname}`;
  
    callback(null, newFilename);
  };

export const imageFileFilter = (req: Request, file: any, callback: (error: any, valid: boolean) => void) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp|pdf)$/i)) { 
        return callback(new BadRequestException('Only image files are allowed! jpg|jpeg|png|gif|svg|webp|pdf'), false);
    }

    callback(null, true);
}