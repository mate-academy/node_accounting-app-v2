import CreateUserDto from "./users.dto";

interface User extends CreateUserDto {
  id: number;
}

export default User;
