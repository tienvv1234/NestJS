import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {

    // messagesRepository: MessagesRepository;

    // constructor(messagesRepo: MessagesRepository) {
    //     this.messagesRepository = messagesRepo;
    // }

    // same to this
    // this is short hand for the above
    constructor(public messagesRepo: MessagesRepository) {
    }

    async findOne(id: string) {
        return this.messagesRepo.findOne(id);
    }
    async findAll() {
        return this.messagesRepo.findAll();
    }
    async create(message: string) {
        return this.messagesRepo.create(message);
    }
}