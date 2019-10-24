import React, {useState, useEffect} from 'react'
import { D3DModel } from './utils/api'
import './detail-panel.css'
import Render, { LightManager, HandleType } from './render'
import Grid from '@material-ui/core/Grid'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip'
import { ChromePicker } from 'react-color'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { MockModel } from './utils/mock'


const useLightStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    expansion: {
        overflowWrap: 'normal',
        flexWrap: 'wrap'
    }
  }),
);

interface LightControlProps {
    lights: LightManager
}

const LightTypeName = [
    ['Ambient Light', 'For global illumination, not working on PBR material'],
    ['Point Light', 'A light that acts like a bulb'],
    ['Spot Light', 'A light acts like a torch']
]

const LightControl : React.FC<LightControlProps> = (props)=>{
    const [controlLevel, setControlLevel] = useState(0)
    const [expanded, setExpanded] = useState(false)
    const [lightsarr, setLightsArr] = useState([...props.lights.lights])
    const classes = useLightStyles();
    useEffect(()=>{
        props.lights.listenAmountChange = (l)=>{
            setLightsArr([...l.lights])
        }
    }, [props.lights])
    
    return (
        <ExpansionPanel expanded={expanded} onChange={()=>setExpanded(!expanded)}>
            <ExpansionPanelSummary
            aria-controls="panel-render-lights"
            id="panel-render-lights"
            expandIcon={<ExpandMoreIcon />}
            >
            <Typography className={classes.heading}>Lighting</Typography>
            <Typography className={classes.secondaryHeading}>Tweak Lights or turn on more lights</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            >
            {
            controlLevel>=0?
                <Grid item xs>
                <ChromePicker onChange={e=>{
                    if(!props.lights.controlling) return;
                    props.lights.controlling.color.setRGB(e.rgb.r / 255.0, e.rgb.g / 255.0, e.rgb.b / 255.0)
                }}/>
                </Grid> : <Typography>No Lights Selected, Click on add lights to add</Typography>
            }
            {
                controlLevel>=0?
                <Grid item xs>
                <Tooltip title={LightTypeName[controlLevel][1]} placement="bottom">
                <Typography>
                    {LightTypeName[controlLevel][0]}
                </Typography>
                </Tooltip>
                </Grid>
                : null
            }
            {
                lightsarr.map((v, idx)=>{return(
                    <p>{idx}</p>
                )})
            }
            
            </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

interface EditProps {
    model?: D3DModel
}



const RenderEditor: React.FC<EditProps> = (props)=>{
    const NotImplFn = ()=>{}
    const [handle, setHandle] = useState<HandleType>()
    const [lights, setLights] = useState<LightManager>()
    const model = MockModel();
    const updateHandle = (h: HandleType)=>{
        if(h) {
            setHandle(h)
            setLights(h.lights)
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} md={8}>
                <div className='canvas-frame-wrapper'>
                <div id='edit-frame'  className='canvas-frame'>
                    <Render 
                        onBgColor={NotImplFn} 
                        model={model}
                        frameid='edit-frame'
                        openCtrl={false}
                        onhandle={updateHandle}
                    />
                </div>
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                {
                    lights ?
                    <LightControl lights={lights}/>
                    :
                    null
                }
                
            </Grid>
        </Grid>
    )
}

export default RenderEditor;