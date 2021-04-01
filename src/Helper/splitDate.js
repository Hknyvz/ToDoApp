import moment from "moment"

export default function splitDate(date){

    const dateSplit=date.split("-");
    return moment().set({ 'year': dateSplit[0], 'month': dateSplit[1] - 1, 'date': dateSplit[2]});
     
  }