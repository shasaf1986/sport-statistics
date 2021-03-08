import moment from 'moment';
import { DataType } from '../types';

export const getFormattedText = (value: any, type?: DataType) => {
  switch (type) {
    case 'date': {
      return moment(value).format('LL');
    }
    default: {
      return value;
    }
  }
};
