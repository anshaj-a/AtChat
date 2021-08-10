import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: "I think we shouldn't call you untitled 🤔" })
  name: string;

  @Matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/, {
    message: 'Invalid username! 😬',
  })
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
