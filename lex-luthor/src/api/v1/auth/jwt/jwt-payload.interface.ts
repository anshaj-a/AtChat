// sometimes I believe compiler ignores all my comments.
export interface JwtPayloadInterface {
  name: string;
  username: string;
  about: string;
  email: string;
  profile_picture: string;
  role: number;
}

export interface JwtSignUpPayloadInterface {
  name: string;
  username: string;
}
