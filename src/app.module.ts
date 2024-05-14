import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RoomModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
