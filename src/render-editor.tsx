import React, {useState, useEffect} from 'react'
import { D3DModel, LightTypes } from './utils/api'
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PrettoSlider from './bits/pretto-slider';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

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

const LightTypeName= [
    ['Ambient Light', 'For global illumination, not working on PBR material'],
    ['Point Light', 'A light that acts like a bulb'],
    ['Spot Light', 'A light acts like a torch']
]

const GetLightTypeId = (str:LightTypes)=>{
    switch (str) {
    case 'ambient': return 0;
    case 'point': return 1;
    case 'spot': return 2;
    default: return -1;
    }
}

const LightControl : React.FC<LightControlProps> = (props)=>{
    const [controlLevel, setControlLevel] = useState(0)
    const [expanded, setExpanded] = useState(false)
    const [lightsarr, setLightsArr] = useState([...props.lights.lights])
    const classes = useLightStyles();
    const [selected, setSelected] = useState(0)
    const [intensity, setIntensity] = useState(0)
    const [distance, setDistance] = useState(0)
    
    useEffect(()=>{
        props.lights.listenAmountChange = (l)=>{
            setLightsArr([...l.lights])
        }
        setTimeout(()=>{
            props.lights.enableEdit(1);
            setControlLevel(1)
            setIntensity(props.lights.lights[1].intensity)
            setDistance((props.lights.lights[1] as any).distance)
        }, 2000)
    }, [props.lights])

    const SetEditingLight = (idx:number) => {
        
    }

    
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
                    props.lights.editColor(e.rgb.r / 255.0, e.rgb.g / 255.0, e.rgb.b / 255.0)
                }}/>
                </Grid> : <Typography>No Lights Selected, Click on add lights to add</Typography>
            }
            <Grid item xs={4}>
            {
                controlLevel>=0?
                
                <Tooltip title={LightTypeName[controlLevel][1]} placement="bottom">
                <Typography>
                    {LightTypeName[controlLevel][0]}
                </Typography>
                </Tooltip>
                : null
            }
            {
                controlLevel>=1?
                <div>
                <Typography gutterBottom>
                Intensity
                </Typography>
                <PrettoSlider
                min={0} max={30} step={0.2} valueLabelDisplay="auto"
                value={intensity}
                defaultValue={0} onChange={(e,v:any)=>{
                    setIntensity(v)
                    props.lights.editIntensity(v)
                }}/>

                <Typography gutterBottom>
                Max Lumination Distance
                </Typography>
                <PrettoSlider 
                value={distance}
                min={0} max={30} step={0.2} valueLabelDisplay="auto"
                defaultValue={0} onChange={(e,v:any)=>{
                    setDistance(v)
                    props.lights.editDistance(v)
                }}/>
                </div>
                : null
            }

            </Grid>
            <FormControl component="fieldset">
                <FormLabel component="legend">Pick Lights in the Scene</FormLabel>
                <RadioGroup aria-label="pick-lights" 
                    name="pick-lights" value={selected} 
                    onChange={(e, v)=>{
                        setSelected(Number(v))
                    }}>
                    {
                        lightsarr.map((v, idx)=>{
                            const info = props.lights.lightsTypeinfo[idx]
                            return(
                            <FormControlLabel value={idx} control={<Radio />} label={'#'+idx.toString() + ' ' + info.type} />
                        )})
                    }
                </RadioGroup>
            </FormControl>
            
            </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

interface EditProps {
    model?: D3DModel
}

const useStyles = makeStyles((theme:Theme)=>({
    ctrl: {
        position: 'absolute',
        right: 0,
        top: 0
    }
}));

const RenderEditor: React.FC<EditProps> = (props)=>{
    const NotImplFn = ()=>{}
    const classes = useStyles();
    const [handle, setHandle] = useState<HandleType>()
    const [lights, setLights] = useState<LightManager>()
    const [model, setModel] = useState(MockModel());
    const [openCtrl, setOpenCtrl] = useState(false)

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
                        openCtrl={openCtrl}
                        onhandle={updateHandle}
                    />
                </div>
                <div className={classes.ctrl}>
                    <IconButton onClick={()=>setOpenCtrl(!openCtrl)} size='small' color='inherit'>
                        <SettingsIcon />
                    </IconButton>
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