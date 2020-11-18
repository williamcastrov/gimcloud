import React from 'react';
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import BarSession from './bar/BarSession/BarSession';

const useStyles = makeStyles((theme) => ({
    sectionDesktop : {
        display : "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    sectionMobile : {
        display : "flex",
        [theme.breakpoints.up("md")] : {
            display : "none"
        }
    }
}));

const AppNavbar = () => {

    return (
        <div>
            <AppBar position="static" >
                <BarSession />
            </AppBar>
        </div>
    );
};

export default AppNavbar;