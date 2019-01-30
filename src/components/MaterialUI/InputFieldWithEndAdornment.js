import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const styles = theme => ({});

class InputFieldWithEndAdornment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

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
      name,
    } = this.props;
    return (
      <TextField
        id={id}
        name={name}
        label={label}
        variant={variant}
        type={this.state.showPassword ? "text" : "password"}
        error={error}
        disabled={disabled}
        fullWidth={fullWidth}
        placeholder={placeholder}
        helperText={helperText}
        margin="dense"
        value={this.state.password}
        onChange={(e) => { this.handleChange("password"); onChange(e) }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
}

export default withStyles(styles)(InputFieldWithEndAdornment);
