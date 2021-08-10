import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LogInDto {
  @IsNotEmpty({ message: "We've never encountered a blank username before 🤔" })
  @Matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/, {
    message: 'Invalid username! 😬',
  })
  username: string;

  @IsNotEmpty({ message: 'Empty password... Strange 😬' })
  @MinLength(8, {
    message: 'Your password should be of 8 characters minimum 🧐',
  })
  password: string;
}
