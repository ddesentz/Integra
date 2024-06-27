import * as React from "react";
import { integraNavStyles } from "./IntegraNavStyles";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ReactSVG } from "react-svg";
import { integraTheme } from "../../common/Theme";
import HomeIcon from "../../assets/navIcons/Home.svg";
import ExploreIcon from "../../assets/navIcons/Explore.svg";
import DatasetIcon from "../../assets/navIcons/Dataset.svg";

interface IIntegraNav {}

const IntegraNavComponent: React.FunctionComponent<IIntegraNav> = () => {
  const { classes } = integraNavStyles();
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const isMobile = useMediaQuery(integraTheme.breakpoints.down(310 * 4));

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <AppBar className={classes.appBarContainer}>
      <Toolbar className={classes.toolbarContainer}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          className={classes.headerContainer}
        >
          {!isMobile && (
            <div className={classes.logoContainer}>
              <Typography
                onClick={() => navigate(`/`)}
                className={classes.logo}
              >
                Integra
              </Typography>
            </div>
          )}
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("")}
            aria-selected={
              params.page !== undefined || params.userId ? false : true
            }
            className={classes.navButton}
          >
            <ReactSVG src={HomeIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>Home</Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("explore")}
            aria-selected={params.page === "explore" ? true : false}
            className={classes.navButton}
          >
            <ReactSVG src={ExploreIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>Explore</Typography>
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            onClick={() => handleNavigate("datasets")}
            aria-selected={params.page === "datasets" ? true : false}
            className={classes.navButton}
          >
            <ReactSVG src={DatasetIcon} className={classes.navIcon} />
            <Typography className={classes.navButtonLabel}>Datasets</Typography>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const IntegraNav = IntegraNavComponent;
