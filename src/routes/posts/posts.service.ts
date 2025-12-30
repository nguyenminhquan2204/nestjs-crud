/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreatePostDTO } from './post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getAllPosts(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId
      },
      include: {
        author: {
          omit: {
            password: true,
          }
        }
      }
    });
  }

  createPost(body: CreatePostDTO, userId: number) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      },
      include: {
        author: {
          omit: {
            password: true,
          }
        }
      }
    })
  }
}
