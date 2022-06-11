import useInput from "../hooks/useInput";
import BasicInput from "./BasicInput";

const getClassesValue = (hasError) => {
  return hasError ? "form-control invalid" : "form-control";
};

const validateEmail = (email) => {
  const ValidEmailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return ValidEmailRegex.test(email);
};

const BasicForm = (_props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    valueChangeHandler: enteredFirstNameChangeHandler,
    inputBlurHandler: enteredFirstNameBlurHandler,
    reset: resetEnteredFirstName,
  } = useInput();

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    valueChangeHandler: enteredLastNameChangeHandler,
    inputBlurHandler: enteredLastNameBlurHandler,
    reset: resetEnteredLastName,
  } = useInput();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: enteredEmailChangeHandler,
    inputBlurHandler: enteredEmailBlurHandler,
    reset: resetEnteredEmail,
  } = useInput(validateEmail);

  const formIsValid =
    enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredEmail);
    resetEnteredFirstName();
    resetEnteredLastName();
    resetEnteredEmail();
  };

  const enteredFirstNameClasses = getClassesValue(enteredFirstNameHasError);
  const enteredLastNameClasses = getClassesValue(enteredLastNameHasError);
  const enteredEmailClasses = getClassesValue(enteredEmailHasError);

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <BasicInput
          labelText="First Name"
          id="firstName"
          type="text"
          errorMessage="First Name must not be empty."
          classes={enteredFirstNameClasses}
          value={enteredFirstName}
          hasError={enteredFirstNameHasError}
          onChange={enteredFirstNameChangeHandler}
          onBlur={enteredFirstNameBlurHandler}
        />
        <div className={enteredLastNameClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={enteredLastName}
            onChange={enteredLastNameChangeHandler}
            onBlur={enteredLastNameBlurHandler}
          />
          {enteredLastNameHasError && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={enteredEmailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={enteredEmailChangeHandler}
          onBlur={enteredEmailBlurHandler}
        />
        {enteredEmailHasError && (
          <p className="error-text">Invalid Email pattern.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
