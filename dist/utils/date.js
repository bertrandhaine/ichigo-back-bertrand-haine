"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDateWithoutTime = exports.getFirstAndLastDayOfWeek = void 0;
function getFirstAndLastDayOfWeek(d) {
    const date = new Date(d);
    date.setUTCHours(0, 0, 0, 0);
    const day = date.getDay();
    const firstDayDiff = date.getDate() - day;
    const lastDayDiff = date.getDate() + (6 - day);
    const firstDay = new Date(date.setDate(firstDayDiff));
    const lastDay = new Date(date.setDate(lastDayDiff));
    return [firstDay, lastDay];
}
exports.getFirstAndLastDayOfWeek = getFirstAndLastDayOfWeek;
function compareDateWithoutTime(date1, date2) {
    const date1WithoutTime = new Date(date1);
    date1WithoutTime.setUTCHours(0, 0, 0, 0);
    const date2WithoutTime = new Date(date2);
    date2WithoutTime.setUTCHours(0, 0, 0, 0);
    return date1WithoutTime.getTime() === date2WithoutTime.getTime();
}
exports.compareDateWithoutTime = compareDateWithoutTime;
//# sourceMappingURL=date.js.map