import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    // messagesService: MessagesService;

    // constructor() {
    //     // DONT DO THIS ON REAL APPS
    //     // USE DEPENDECY INJECTION
    //     this.messagesService = new MessagesService(new MessagesRepositoryz());
    // }

    constructor(public messagesService: MessagesService) {

    }

    @Get()
    listMessages() {
        return this.messagesService.findAll();
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content);
    }

    @Get('/id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messagesService.findOne(id);
        if (!message) {
            throw new NotFoundException(`Message with id ${id} not found`);
        }
        return message;
    }
}
