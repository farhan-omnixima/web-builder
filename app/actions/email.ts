export const isValidEmail = (maybeEmail: unknown): boolean => {
  if (typeof maybeEmail !== "string") return false;
  if (maybeEmail.length > 65 || maybeEmail.length < 4) return false;
  const emailRegexp = /^.+@.+$/;
  return emailRegexp.test(maybeEmail);
};
