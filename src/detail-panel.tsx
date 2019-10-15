import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Render from './render'
import Grid from '@material-ui/core/Grid'
import './detail-panel.css'

interface Props {
    open: boolean
    onClose: ()=>any
}

const DetailPanel : React.FC<Props> = (props)=>{
    const [tm, setTm]= useState([1,1,1,1,1,1,1,1])
    return(
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" maxWidth='xl' fullWidth={true}>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <div className='canvas-frame-wrapper'>
                    <div id='canvas-frame'  className='canvas-frame'>
                        <Render />
                    </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
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