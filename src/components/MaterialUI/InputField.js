import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
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
      value,
      multiline,
      rowsMax,
      rows,
      onClick,
      maxLength,
      isAddon,
      onClickAdornment
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
        multiline={multiline}
        rowsMax={rowsMax}
        rows={rows}
        onClick={onClick}
        inputProps={{ maxLength: maxLength ? maxLength : 100000000 }}
        InputProps={isAddon && {
          endAdornment: (
            <InputAdornment position="end" onClick={onClickAdornment}>
              <i class="material-icons">clear</i>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export default withStyles(styles)(InputField);
