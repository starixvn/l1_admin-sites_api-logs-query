import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('default')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Default route - returns API status',
  })
  getDefault() {
    return { status: 'ok' };
  }
}
