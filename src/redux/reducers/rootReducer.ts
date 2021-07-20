import { combineReducers } from 'redux';
import auth from './auth.reducer';
import alert from './alert.reducer';
import categories from './category.reducer';

export default combineReducers({ auth, alert, categories });
