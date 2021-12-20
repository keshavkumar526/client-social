export const LoginStart = (userInput) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (userInformation) => ({
  type: "LOGIN_SUCCESS",
  payload: userInformation,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
