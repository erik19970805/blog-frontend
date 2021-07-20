import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  ICategoryType,
  IResCategory,
} from '../types/category.types';

const authReducer = (state: IResCategory[] = [], action: ICategoryType): IResCategory[] => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return [action.payload, ...state];
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
