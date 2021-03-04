import moment from "moment";

export const getFormattedText = (value: any, type?: 'string' | 'date') => {
  switch (type) {
    case 'date': {
      return moment(value).format('LL');
    }
    default: {
      return value;
    }
  }
};
