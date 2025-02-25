import { Body, Controller, Get, HttpCode, HttpStatus, ParseFilePipeBuilder, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarsStorage } from 'src/multer.config';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    @UseInterceptors(FileInterceptor("avatar", { storage: avatarsStorage }))
    async signUp(
        @Body() signUpDto: SignUpDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) file?: Express.Multer.File
    ) {
        return await this.authService.signUp(signUpDto, file?.filename);
    }

    @UseGuards(AuthGuard("local"))
    @HttpCode(HttpStatus.OK)
    @Post("sign-in") 
    async signIn(@Request() req: any) {
        return await this.authService.signIn(req);
    }

    @UseGuards(AuthGuard("google"))
    @Get("google")
    async googleAuth(@Request() req: any) {}

    @UseGuards(AuthGuard("google"))
    @Get("google/redirect")
    async googleAuthRedirect(@Request() req: any) {
        return await this.authService.signIn(req);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    getMe(@Request() req: any) {
        return { userId: req.user.userId };
    }
}
