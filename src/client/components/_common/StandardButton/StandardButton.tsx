import * as React from "react";
import { standardButtonStyles } from "./StandardButtonStyles";
import { Button } from "@mui/material";
import { integraTheme } from "../../../common/Theme";

interface IStandardButton {
  text: string;
  onClick: () => void;
  height?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  type?: "primary" | "action";
}

const StandardButtonComponent: React.FunctionComponent<IStandardButton> = ({
  text,
  onClick,
  height = integraTheme.spacing(10),
  disabled = false,
  endIcon = undefined,
  type = "primary",
}) => {
  const { classes } = standardButtonStyles();

  return (
    <Button
      disableRipple
      disableTouchRipple
      disabled={disabled}
      onClick={onClick}
      style={{ height: height }}
      endIcon={endIcon}
      className={
        type === "primary"
          ? classes.primaryButtonContainer
          : classes.actionButtonContainer
      }
    >
      {text}
    </Button>
  );
};

export const StandardButton = StandardButtonComponent;
