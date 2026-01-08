import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com', description: 'Admin email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Admin password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'User details' })
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
