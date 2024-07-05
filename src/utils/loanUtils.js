export const getColor = (type) => {
  switch (type) {
    case "Student Loan":
      return "#36A2EB";
    case "Mortgage Loan":
      return "#4CAF50";
    case "Personal Loan":
      return "#FF9800";
    default:
      return "#CCCCCC";
  }
};

export const calculateTimePassedPercent = (originationDate, term, status) => {
  if (status === "Paid Off") {
    return "100%";
  }

  const startDate = new Date(originationDate);
  const currentDate = new Date();
  const totalMonths = term * 12;

  const monthsPassed =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());

  const percentPassed = (monthsPassed / totalMonths) * 100;

  return Math.min(percentPassed, 100).toFixed(2) + "%";
};
export const calculateEndDate = (originationDate, term) => {
  const startDate = new Date(originationDate);
  const endDate = new Date(
    startDate.setFullYear(startDate.getFullYear() + term)
  );
  return endDate.toLocaleDateString();
};