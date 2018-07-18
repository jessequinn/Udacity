// needed for timestamp formatting (https://github.com/moment/moment) and react-moment (https://www.npmjs.com/package/react-moment)
// refer to https://devhints.io/moment
import moment from "moment";

export const formatDate = timestamp => moment(timestamp).format("MMMM Do YYYY");
