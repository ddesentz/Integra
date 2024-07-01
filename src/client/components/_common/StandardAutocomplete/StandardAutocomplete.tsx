import * as React from "react";
import { standardAutocompleteStyles } from "./StandardAutocompleteStyles";
import {
  Autocomplete,
  IconButton,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import { integraTheme } from "../../../common/Theme";
import { FixedSizeList } from "react-window";
import { IKeyValue } from "../../../common/types/common/KeyValue";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface IStandardAutocomplete {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  options: string[] | IKeyValue[];
  height?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  maxRendered?: number;
  itemSize?: number;
  itemRenderer?: (item: IKeyValue | string, index: number) => JSX.Element;
  freeSolo?: boolean;
  disabled?: boolean;
}

const StandardAutocompleteComponent: React.FunctionComponent<
  IStandardAutocomplete
> = ({
  value,
  setValue,
  searchTerm,
  setSearchTerm,
  placeholder,
  options,
  height = integraTheme.spacing(10),
  startIcon,
  endIcon,
  maxRendered = 10,
  itemSize = 56,
  itemRenderer,
  freeSolo = false,
  disabled = false,
}) => {
  const { classes } = standardAutocompleteStyles();
  const autoCompleteRef = React.useRef<HTMLDivElement>(null);
  const textFieldRef = React.useRef<HTMLDivElement>(null);
  const keyboardOpen = useDetectKeyboardOpen();
  const [focused, setFocused] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const closePopper = () => {
    setOpen(false);
    setFocused(false);
    blurKeyboard();
  };
  const openPopper = () => {
    setOpen(true);
    setFocused(true);
    focusKeyboard();
  };

  React.useEffect(() => {
    document.addEventListener("focusout", () => {
      closePopper();
    });
    return () => {
      document.removeEventListener("focusout", closePopper);
    };
  }, []);

  const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
  >((props, ref) => {
    const { children, ...other } = props;
    const itemData: React.ReactElement[] = [];
    (children as React.ReactElement[]).forEach(
      (item: React.ReactElement & { children?: React.ReactElement[] }) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
      }
    );
    const itemCount = itemData.length;

    const OuterElementContext = React.createContext({});
    const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
      const outerProps = React.useContext(OuterElementContext);
      return <div ref={ref} {...props} {...outerProps} />;
    });

    const defaultRenderer = (props: any) => {
      const { data, index, style } = props;
      const dataSet = data[index];

      return (
        <Typography
          {...dataSet[0]}
          key={index}
          style={style}
          component={"div"}
          className={classes.defaultItemRenderer}
        >
          {itemRenderer ? itemRenderer(dataSet[1], dataSet[2]) : dataSet[1]}
        </Typography>
      );
    };

    return (
      <div
        ref={ref}
        style={{
          overflow: keyboardOpen ? "visible" : "auto",
          display: focused ? "block" : "none",
          height: keyboardOpen
            ? `calc(100svh - ${integraTheme.spacing(10)})`
            : "unset",
        }}
        className={classes.virtualWrapper}
      >
        <OuterElementContext.Provider value={other}>
          <FixedSizeList
            itemData={itemData}
            height={Math.min(maxRendered! * itemSize!, itemCount * itemSize!)}
            width="100%"
            outerElementType={OuterElementType}
            itemSize={itemSize!}
            overscanCount={5}
            itemCount={itemCount}
          >
            {defaultRenderer}
          </FixedSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

  const VirtualPopper = (props: any) => {
    return (
      <Popper
        open={props.open}
        anchorEl={props.anchorEl}
        className={classes.virtualPopper}
        style={{
          width: keyboardOpen ? `100%` : props.style.width + 24,
          height: keyboardOpen
            ? `calc(100% - ${integraTheme.spacing(10)})`
            : props.style.height,
        }}
      >
        {props.children}
      </Popper>
    );
  };

  const handleOnChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | IKeyValue | null
  ) => {
    setValue(value);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    focusKeyboard();
    setSearchTerm && setSearchTerm(event.target.value as string);
  };

  const focusKeyboard = () => {
    setFocused(true);
  };

  const blurKeyboard = () => {
    if (textFieldRef.current) {
      const inputEl = textFieldRef.current.querySelector("input");
      if (inputEl) {
        inputEl.blur();
        setFocused(false);
      }
    }
  };

  return (
    <>
      {keyboardOpen && focused && (
        <IconButton
          disableFocusRipple
          disableRipple
          className={classes.keyboardBackButton}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </IconButton>
      )}
      <Paper
        style={{
          height: height,
          fontSize: `calc(${height} / 2.5)`,
        }}
        className={
          keyboardOpen && focused
            ? classes.keyboardAutocompleteContainer
            : classes.standardAutocompleteContainer
        }
      >
        <Autocomplete
          ref={autoCompleteRef}
          open={open}
          onOpen={openPopper}
          onFocus={openPopper}
          onClose={closePopper}
          onBlur={closePopper}
          options={[...options]}
          disabled={disabled}
          disableListWrap
          getOptionLabel={(option) => {
            if (typeof option === "object") return option.key;
            return option;
          }}
          PopperComponent={VirtualPopper}
          ListboxComponent={ListboxComponent}
          renderOption={(props, option, state) =>
            [props, option, state.index] as React.ReactNode
          }
          freeSolo={freeSolo}
          renderInput={(params) => (
            <TextField
              ref={textFieldRef}
              {...params}
              variant="standard"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder={placeholder}
              className={classes.textField}
            />
          )}
          value={value}
          onChange={handleOnChange}
          isOptionEqualToValue={(option, value) =>
            option.key ? option.key === value.key : option === value
          }
          blurOnSelect
          className={classes.autocomplete}
        />
      </Paper>
    </>
  );
};

export const StandardAutocomplete = StandardAutocompleteComponent;
