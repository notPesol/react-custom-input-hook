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

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouch] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;

  const valueIsValid = validateValue(state.value);
  const hasError = !valueIsValid && state.isTouch;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispathState({ type: "CHANGE", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    // setIsTouch(true);
    dispathState({ type: "BLUR" });
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouch(false);
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
