import React, {useContext, useEffect}from 'react'

import SignIn from './buttonSignIn'
import SignUp from './buttonSignUp'
import { profile } from './store';
import { Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    avater:{
        width:40,
        height:40,
    },
});
export const LogBar: React.FC = (props) =>{
    const pro = useContext(profile)
    const classes = useStyles();
    // useEffect(() => {
    //     console.log(pro)
    // }, [pro]);
    return(
        <div className="LogBar" style={{float:'right'}}>
        {
            pro.user.username ?
            <Grid container spacing={3}>
                <Grid item xs>
                    <div style={{lineHeight:'40px', color:'white',marginRight:'-10px'}}>
                        WELCOME!
                    </div>
                </Grid>
                <Grid item xs>
                    <Avatar className={classes.avater} >
                        SB
                    </Avatar>
                </Grid>
            </Grid>
            :
            <div>
                <SignIn/>
                <SignUp/>
            </div>
        }
        </div>
    )
}