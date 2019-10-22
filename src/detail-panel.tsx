import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Render from './render'
import Grid from '@material-ui/core/Grid'
import './detail-panel.css'
import {profile} from './bits/store'
import { D3DModel } from './utils/api'
import { MockModel } from './utils/mock'
import {makeStyles, Theme} from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme:Theme)=>({
    ctrl: {
        position: 'absolute',
        right: 0,
    }
}));

interface Props {
    open: boolean
    onClose: ()=>any
}

const DetailPanel : React.FC<Props> = (props)=>{
    const classes = useStyles();
    const tm = [1,1,1,1,1,1,1,1]
    const pro = useContext(profile)
    const [canvasBg, setCanvasBg] = useState('');
    const [currentModel, setCurrentModel] = useState<D3DModel|null>(null)
    const [openCtrl, setOpenCtrl] = useState(false)
    useEffect(()=>{
        if(props.open) {
            console.log('triggering rerender')
            setCurrentModel(MockModel())
        }

    }, [props.open])
    return(
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" maxWidth='xl' fullWidth={true}>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <div className='canvas-frame-wrapper'>
                    <div id='canvas-frame'  className='canvas-frame' style={{background:canvasBg}}>
                        <Render 
                            onBgColor={setCanvasBg} 
                            model={currentModel}
                            frameid='canvas-frame'
                        />
                        <div className={classes.ctrl}>
                            <IconButton onClick={()=>setOpenCtrl(!openCtrl)} size='small'>
                                <SettingsIcon />
                            </IconButton>
                            
                        </div>
                    </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <p>{pro.user.username}</p>
                    This is a test
                    {
                        tm.map((v, idx)=><p key={idx}>FFFFFFF</p>)
                    }
                </Grid>
            </Grid>
            
                
        </Dialog>
    )
    
}

export default DetailPanel