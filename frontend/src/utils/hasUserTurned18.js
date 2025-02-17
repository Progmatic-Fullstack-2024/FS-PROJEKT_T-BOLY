const hasUserTurned18 = (birthDateString) => {
  if (!birthDateString) return false;

  const birthDate = new Date(birthDateString);
  const today = new Date();

  const eighteenthBirthday = new Date(
    birthDate.getFullYear() + 18,
    birthDate.getMonth(),
    birthDate.getDate(),
  );

  return today >= eighteenthBirthday;
};

export default hasUserTurned18;
