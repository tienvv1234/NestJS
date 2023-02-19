import { Module } from '@nestjs/common';
import { TestController } from './test.module';

@Module({
    controllers: [TestController],
})
export class TestModule {}
