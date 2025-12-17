import { Body, Controller, Get, Post } from '@nestjs/common'
import { PostsService } from './posts.service'

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
}
