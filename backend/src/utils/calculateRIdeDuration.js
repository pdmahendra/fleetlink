export const calculateRideDuration = (fromPincode, toPincode) => {
  const duration = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
  return duration === 0 ? 1 : duration;
};
