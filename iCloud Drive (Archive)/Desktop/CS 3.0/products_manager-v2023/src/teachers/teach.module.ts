import { Module } from '@nestjs/common';
import { TeachController } from './teach.controller';
import { TeachService } from './teach.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachSchema } from './teach.model';

@Module({
  //imports: [ProductModule],
   imports: [MongooseModule.forFeature([{ name: 'Teach', schema: TeachSchema }])],
  controllers: [TeachController],
  providers: [TeachService]
})
export class TeachModule { }