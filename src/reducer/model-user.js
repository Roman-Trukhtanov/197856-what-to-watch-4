const modelUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatarSrc: `https://4.react.pages.academy${user.avatar_url}`,
});

export default modelUser;