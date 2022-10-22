export const heloSignIn = () => {
  window.location.assign(
    `${process.env.NEXT_PUBLIC_AUTH_SIGNIN_URL}?redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL}`
  );
};
