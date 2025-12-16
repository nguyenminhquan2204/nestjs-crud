import { Controller, Get } from '@nestjs/common'
import { PostsService } from './posts.service'

@Controller('v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts()
  }
}
