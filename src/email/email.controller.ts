import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
    constructor(private readonly emailService : EmailService) {}

    @Post('send')
    async sendEmail(@Body() emailDto: EmailDto) {
        await this.emailService.sendEmail(emailDto);
        return {message: "Email sent successfully"};
    }
}
