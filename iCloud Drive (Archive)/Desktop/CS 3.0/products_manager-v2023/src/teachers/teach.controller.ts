import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { TeachService } from './teach.service';

@Controller('teachers')
export class TeachController {
    constructor(private readonly teachsService: TeachService) { }
    
    @Get()
    async getAllTeachs() {
        const teachs = await this.teachsService.getAllTeachs();
        return teachs;
    }

    @Post()
    async addProduct(
        @Body('name') teachName: string, 
        @Body('subject') teachSubject: string,
        @Body('spec') teachSpec: string, 
        @Body('clas') teachClas: Array<string>, 
        @Body('picture') teachPicture: string,
        ) {

        const generatedId = await this.teachsService.insertTeach(teachName, teachSubject, teachSpec, teachClas, teachPicture);
        return { id: generatedId };
    }

    @Get(':id')
    async getTeachById(@Param('id') teachId: string,) {
        const teach  = await this.teachsService.getTeachById(teachId);
    
        return teach;
    }

    @Patch(':id')
    async updateTeachById(
        @Param('id') teachId: string,
        @Body('name') teachName: string, 
        @Body('subject') teachSubject: string,
        @Body('spec') teachSpec: string, 
        @Body('clas') teachClas: Array<string>, 
        @Body('picture') teachPicture: string,
    ) {
        await this.teachsService.updateTeachById(teachId, teachName, teachSubject, teachSpec, teachClas, teachPicture);
        return null;
    }

    @Delete(':id')
    async deleteTeachById(@Param('id') teachId: string,) {
        await this.teachsService.deleteTeachById(teachId);
        return null;
    }
}