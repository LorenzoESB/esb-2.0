import { ApiProperty } from '@nestjs/swagger';

export class BlogPostListResponseDto {
  @ApiProperty({
    description: 'Array of WordPress posts (as returned by the WordPress API)',
    type: [Object],
  })
  posts: any[];

  @ApiProperty({
    description: 'Total number of pages available on WordPress',
    example: 12,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Total number of posts available on WordPress',
    example: 234,
  })
  totalPosts: number;
}

export class BlogCategoryDto {
  @ApiProperty({ example: 12 })
  id: number;

  @ApiProperty({ example: 'Investimentos' })
  name: string;

  @ApiProperty({ example: 'investimentos' })
  slug: string;

  @ApiProperty({ example: 'Artigos sobre investimentos' })
  description: string;

  @ApiProperty({ example: 42 })
  count: number;

  @ApiProperty({
    example: 'https://educandoseubolso.blog.br/categoria/investimentos',
  })
  link: string;
}

export class BlogMediaDto {
  @ApiProperty({ example: 1234 })
  id: number;

  @ApiProperty({
    example: 'https://educandoseubolso.blog.br/wp-content/uploads/hero.jpg',
  })
  source_url: string;

  @ApiProperty({ example: 'Hero image' })
  alt_text: string;
}
