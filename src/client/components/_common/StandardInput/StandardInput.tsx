import * as React from "react";
import { standardInputStyles } from "./StandardInputStyles";
import { InputBase, Paper } from "@mui/material";
import { integraTheme } from "../../../common/Theme";

interface IStandardInput {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  placeholder?: string;
  error?: boolean;
  height?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  maxLength?: number;
  isNumber?: boolean;
}

const StandardInputComponent: React.FunctionComponent<IStandardInput> = ({
  value,
  setValue,
  placeholder,
  error = false,
  height = integraTheme.spacing(10),
  startIcon,
  endIcon,
  maxLength = 524288,
  isNumber = false,
}) => {
  const { classes } = standardInputStyles();

  return (
    <Paper
      style={{ height: height, fontSize: `calc(${height} / 2.5)` }}
      className={classes.standardInputContainer}
    >
      {startIcon}
      <InputBase
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        placeholder={placeholder}
        error={error}
        inputProps={{
          maxLength: maxLength,
        }}
        type={isNumber ? "number" : "text"}
        inputMode={isNumber ? "numeric" : "text"}
        componentsProps={{
          input: {
            inputMode: isNumber ? "numeric" : "text",
            pattern: isNumber ? "[0-9]*" : undefined,
          },
        }}
        className={classes.textField}
      />
      {endIcon}
    </Paper>
  );
};

export const StandardInput = StandardInputComponent;
