import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];
}