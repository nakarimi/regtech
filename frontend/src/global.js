import moment from "moment";

// Convert the date format as defined.
export const formatDate = function (date) {
  if (date) {
    return moment(String(date)).format("MM/DD/YYYY hh:mm");
  } else {
    return "-";
  }
};
