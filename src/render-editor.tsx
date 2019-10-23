import React from 'react'
import { D3DModel } from './utils/api'
import './detail-panel.css'
import Render from './render'
import Grid from '@material-ui/core/Grid'

interface EditProps {
    model?: D3DModel
}

const RenderEditor: React.FC<EditProps> = (props)=>{
    const NotImplFn = ()=>{}
    
    return (
        <Grid container>
            <Grid item xs={12} md={8}>
                <div className='canvas-frame-wrapper'>
                <div id='edit-frame'  className='canvas-frame'>
                    <Render 
                        onBgColor={NotImplFn} 
                        model={props.model ? props.model : null}
                        frameid='edit-frame'
                        openCtrl={false}
                    />
                </div>
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                
            </Grid>
        </Grid>
    )
}

export default RenderEditor;