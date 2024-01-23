import moment from "moment";

export function genericDateFormat(date: moment.MomentInput, format: string | undefined) {
    if (format) date = moment(date, "YYYYMMD").format(format);
    else date = moment(date, "YYYYMMD").format("DD.MM.YYYY");
    return date.includes("Invalid") ? "" : date;
}

export function genericTimeFormat(date: moment.MomentInput, format?: string | undefined) {
    if (format) date = moment(date, "hmmss").format(format);
    else date = moment(date, "hmm").format("HH:mm");
    return date.includes("Invalid") ? "" : date;
}