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
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme:Theme)=>({
    ctrl: {
        position: 'absolute',
        right: 0,
        top: 0
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
    const [offsetY, setOffsetY] = useState(0)
    useEffect(()=>{
        if(props.open) {
            setOpenCtrl(false)
            console.log('triggering rerender')
            setCurrentModel(MockModel())
        }

    }, [props.open])
    const seBgW = (bg:string) => {
        console.log(bg);
        setCanvasBg(bg)
    }
    return(
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" maxWidth='xl' fullWidth={true}>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <div className='canvas-frame-wrapper'>
                        <div id='canvas-frame'  className='canvas-frame' style={{background:canvasBg}}>
                            
                        </div>
                        <Render 
                            onBgColor={seBgW} 
                            model={currentModel}
                            frameid='canvas-frame'
                            openCtrl={openCtrl}
                        />
                        <div className={classes.ctrl}>
                            <IconButton onClick={()=>setOpenCtrl(!openCtrl)} size='small' color='inherit'>
                                <SettingsIcon />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button onClick={()=>setOpenCtrl(!openCtrl)}>
                        Toggle Ctrl
                    </Button>
                    <Button onClick={()=>setOffsetY(offsetY===0?200:0)}>
                        MoveDown
                    </Button>
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