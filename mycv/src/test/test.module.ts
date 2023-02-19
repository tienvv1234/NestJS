import { Controller, Get } from '@nestjs/common';
@Controller('test')
export class TestController {
    // constructor(private reportsService: ReportsService) {}

    @Get('')
    createReport() {
        console.log('user');
        return 'hi';
    }
}
