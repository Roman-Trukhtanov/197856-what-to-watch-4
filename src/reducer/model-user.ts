import {User} from "../types";

const modelUser = (user): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatarSrc: user.avatar_url,
});

export default modelUser;
