function BasicInput(props) {
  const {
    id,
    classes,
    value,
    labelText,
    type,
    onChange,
    onBlur,
    hasError,
    errorMessage,
  } = props;

  return (
    <div className={classes}>
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {hasError && <p className="error-text">{errorMessage}</p>}
    </div>
  );
}

export default BasicInput;
