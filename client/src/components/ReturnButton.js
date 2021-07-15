// imports
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import history from "../history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Styling the Component and the background CSS styles method.  
const useStyles = makeStyles({
  root: {
    backgroundColor: "orange",
    color: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    bottom: 0,
  },
});


// Bottom navigation button to return to previous page
export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    // Return to view the previous page
    return (
        <BottomNavigation
            value={value}
            onClick={(event, newValue) => {
                history.goBack();
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Return" icon={<RestoreIcon />} />
        </BottomNavigation>
    );
}
