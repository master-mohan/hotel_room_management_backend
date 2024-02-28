const crypto = require("crypto");
const {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  subDays,
  isEqual,
} = require("date-fns");

//to generate unique id
exports.generateUniqueID = (length = 10) => {
  return crypto.randomBytes(length).toString("hex");
};

//to calculate total nights of customer stay
exports.calculateNights = (startDate, endDate) => {
  return differenceInCalendarDays(new Date(endDate), new Date(startDate));
};

exports.getDateArrayInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  // Subtract one day from the end date as we not consider checkout day
  const end = new Date(endDate);
  // Check if start and end dates are the same
  if (isEqual(start, end)) {
    return [format(start, "yyyy-MM-dd")];
  }
  const endBitOne = subDays(new Date(endDate), 1);

  const dateRange = eachDayOfInterval({ start, endBitOne });

  return dateRange.map((date) => format(date, "yyyy-MM-dd"));
};
