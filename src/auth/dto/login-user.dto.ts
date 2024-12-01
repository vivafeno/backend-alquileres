import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// This class is used to validate the user login data
export class LoginUserDto {   
    // The email of the user
    @IsString()
    @IsEmail()
        email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
        password: string;
}
