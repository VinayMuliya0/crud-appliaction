import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  form: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  forms: [],
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        form: action.payload,
        forms: [...state.forms, action.payload],
      };
    case "DELETE_DATA":
      return {
        ...state,
        forms: state.forms.filter((form) => form.id !== action.payload),
      };
    case "EDIT_DATA":
      return {
        ...state,
        forms: state.forms.map((form) =>
          form.id === action.payload.id ? action.payload : form
        ),
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, formReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
