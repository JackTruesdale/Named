import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TeachModule } from './teachers/teach.module';

// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [TeachModule, MongooseModule.forRoot('mongodb+srv://JTrues:Password@cluster0.x8zl8kt.mongodb.net/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
