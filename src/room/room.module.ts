import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';

@Module({
  controllers: [RoomController, RoomRepository],
  providers: [RoomService, RoomRepository],
})
export class RoomModule {}
