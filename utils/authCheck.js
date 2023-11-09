export const checkUserAuthentication = (req) => {
  const user = req.cookies;
  console.log(user);
};
