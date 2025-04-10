import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('default')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Default route - redirects to health check endpoint',
  })
  @Redirect('/health', 301)
  getDefault() {
    return;
  }
}
