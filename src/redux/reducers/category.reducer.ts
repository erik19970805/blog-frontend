import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  ICategoryType,
  IResCategory,
  DELETE_CATEGORY,
} from '../types/category.types';

const authReducer = (state: IResCategory[] = [], action: ICategoryType): IResCategory[] => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return [action.payload, ...state];
    case GET_CATEGORIES:
      return action.payload;
    case UPDATE_CATEGORY:
      return state.map((item) =>
        item._id === action.payload._id ? { ...item, name: action.payload.name } : item
      );
    case DELETE_CATEGORY:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default authReducer;
