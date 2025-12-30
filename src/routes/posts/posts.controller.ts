import { Body, Controller, Get, Post } from '@nestjs/common'
import { PostsService } from './posts.service'
import * as fs from 'fs'
import * as path from 'path'
import { AuthType, ConditionGuard } from 'src/shared/constant/auth.constant'
import { Auth } from 'src/shared/decorators/auth.decorator'
import type { Request } from 'express'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { CreatePostDTO, GetPostItemDTO } from './post.dto'

@Controller('v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.AND})
  @Get()
  getAllPosts(@ActiveUser('userId') userId: number) {
    return this.postsService.getAllPosts(userId)
  }

  @Post()
  @Auth([AuthType.Bearer])
  async createPost(@Body() body: CreatePostDTO, @ActiveUser('userId') userId: number) {
    // return this.postsService.createPost(body, userId);
    return new GetPostItemDTO(await this.postsService.createPost(body, userId));
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
