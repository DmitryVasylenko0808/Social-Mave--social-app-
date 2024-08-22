import { Body, Controller, Param, ParseIntPipe, Patch, UseGuards, Request, HttpStatus, ParseFilePipeBuilder, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { EditUserDto } from './dto/edit.user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { avatarsStorage, coversStorage } from 'src/multer.config';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id")
    @UseInterceptors(
        FileInterceptor("avatar", { storage: avatarsStorage })
    )
    async edit(
        @Param("id") id: string, 
        @Body() editUserDto: EditUserDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) file?: Express.Multer.File
    ) {
        return await this.usersService.edit(id, editUserDto, file?.filename);
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id/follow")
    async follow(@Param("id", ParseIntPipe) id: number, @Request() req: any) {}

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id/unfollow")
    async unfollow(@Param("id", ParseIntPipe) id: number, @Request() req: any) {}
}
