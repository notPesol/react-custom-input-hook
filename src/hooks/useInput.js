import { useReducer } from "react";

const defaultValidateValue = (value) => value.trim() !== "";

const inputStateReducer = (prevState, action) => {
  if (action.type === "CHANGE") {
    return {
      ...prevState,
      value: action.value,
    };
  } else if (action.type === "BLUR") {
    return {
      ...prevState,
      isTouch: true,
    };
  } else if (action.type === "RESET") {
    return {
      value: "",
      isTouch: false,
    };
  }
  // default bahavior (return prev state)
  return prevState;
};

const useInput = (validateValue = defaultValidateValue) => {
  const [state, dispathState] = useReducer(inputStateReducer, {
    value: "",
    isTouch: false,
  });

  const valueIsValid = validateValue(state.value);
  const hasError = !valueIsValid && state.isTouch;

  const valueChangeHandler = (event) => {
    dispathState({ type: "CHANGE", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispathState({ type: "BLUR" });
  };

  const reset = () => {
    dispathState({ type: "RESET" });
  };

  return {
    value: state.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
