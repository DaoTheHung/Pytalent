import { addZ } from "./addZeroDate";

export const getDates = (date) => {
    const str =
        addZ(date.getDate())
        + "-" +
        addZ(date.getMonth() + 1)
        + "-" +
        date.getFullYear()
        + " " +
        addZ(date.getHours())
        + ":" +
        addZ(date.getMinutes())
        + ":" +
        addZ(date.getSeconds())


    return str;


}