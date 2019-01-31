import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({});

class InputField extends React.Component {
  render() {
    const {
      label,
      id,
      variant,
      error,
      disabled,
      fullWidth,
      onChange,
      placeholder,
      helperText,
      type,
      name,
      value
    } = this.props;
    return (
      <TextField
        label={label}
        variant={variant}
        id={id}
        name={name}
        error={error}
        disabled={disabled}
        fullWidth={fullWidth}
        onChange={onChange}
        placeholder={placeholder}
        helperText={helperText}
        value={value}
        margin="dense"
        type={type ? type : "text"}
      />
    );
  }
}

export default withStyles(styles)(InputField);
