import { Body, Controller, Get, Post } from '@nestjs/common'
import { PostsService } from './posts.service'
import * as fs from 'fs'
import * as path from 'path'

@Controller('v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts()
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postsService.createPost(body);
  }

  @Post('upload')
  postFileParameter(@Body() body: any) {
    const fileName = `post-${Date.now()}.json`
    const filePath = path.join(process.cwd(), 'uploads', fileName)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2))
    
    return {
      message: 'Đã lưu file',
      fileName,
    }
  }
}
