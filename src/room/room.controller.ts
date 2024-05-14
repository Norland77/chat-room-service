import { Body, Controller } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomCreateDto } from './dto/room-create.dto';
import { IRoom } from './interfaces/IRoom';
import { IAllRooms } from './interfaces/IAllRooms';
import { MessagePattern } from '@nestjs/microservices';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @MessagePattern('post.create')
  async createRoom(@Body() dto: RoomCreateDto): Promise<IRoom> {
    await this.roomService.findRoomByName(dto.name);

    return this.roomService.createRoom(dto);
  }

  @MessagePattern('delete.byId')
  async deleteRoom(id: string): Promise<IRoom> {
    await this.roomService.findRoomById(id);

    return this.roomService.deleteRoom(id);
  }

  @MessagePattern('get.all')
  async getAllRooms(): Promise<IAllRooms[]> {
    return this.roomService.getAllRooms();
  }

  @MessagePattern('get.byId')
  async getRoomById(id: string): Promise<IRoom> {
    return await this.roomService.findRoomById(id);
  }

  @MessagePattern('put.leaveRoom')
  async leaveRoom(data: { roomId: string; userId: string }): Promise<IRoom> {
    await this.roomService.findRoomById(data.roomId);
    return this.roomService.leaveRoom(data.roomId, data.userId);
  }

  @MessagePattern('post.createPersonal')
  async createPersonal(dto: RoomCreateDto): Promise<IRoom> {
    return this.roomService.createPersonal(dto);
  }

  @MessagePattern('post.addInviteLink')
  async addInviteLink(data: {
    inviteLink: string;
    roomId: string;
  }): Promise<IRoom> {
    return this.roomService.addInviteLink(data.inviteLink, data.roomId);
  }

  @MessagePattern('post.addUser')
  async addUserToRoom(data: {
    roomId: string;
    userId: string;
  }): Promise<IRoom> {
    return this.roomService.addUserToRoom(data.roomId, data.userId);
  }
}
