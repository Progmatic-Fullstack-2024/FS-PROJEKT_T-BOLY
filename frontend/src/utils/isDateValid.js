const isDateValid = (validFrom, validTo) => {
  const today = new Date();
  const from = new Date(validFrom);
  const to = new Date(validTo);
  return today >= from && today <= to;
};

export default isDateValid;
