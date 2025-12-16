import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
// import { PrismaService } from 'src/shared/services/prisma.service'

@Module({
  // imports: [PrismaService],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
