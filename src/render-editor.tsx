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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PrettoSlider from './bits/pretto-slider';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FlareIcon from '@material-ui/icons/Flare';
import HighlightIcon from '@material-ui/icons/Highlight';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const useLightStyles = makeStyles((theme: Theme) =>
  createStyles({
    rdioroot: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
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
    },
    colorPicker: {
        margin: theme.spacing(2)
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

const actions: ({name:LightTypes, icon:any})[] = [
    {name: 'ambient', icon: <BlurOnIcon />},
    {name: 'point', icon: <FlareIcon />},
    {name: 'spot', icon: <HighlightIcon />}
]

const LightControl : React.FC<LightControlProps> = (props)=>{
    const [controlLevel, setControlLevel] = useState(0)
    const [expanded, setExpanded] = useState(false)
    const [lightsarr, setLightsArr] = useState([...props.lights.lights])
    const classes = useLightStyles();
    const [selected, setSelected] = useState(0)
    const [intensity, setIntensity] = useState(0)
    const [distance, setDistance] = useState(0)
    const [decay, setDecay] = useState(0)
    const [angle, setAngle] = useState(0)
    const [penumbra, setPenumbra] = useState(0)

    const [color, setColor] = useState({r:0, g:0, b:0})
    const [openAddLight, setOpenAddLight] = React.useState(false);
    
    useEffect(()=>{
        props.lights.listenAmountChange = (l)=>{
            setLightsArr([...l.lights])
        }
        setTimeout(()=>{
            setSelected(0)
        }, 2000) //TODO: Better solution
    }, [props.lights])

    const AddLight = (type: LightTypes)=>{
        props.lights.addLight(type)
    }

    const SetEditingLight = (idx:number) => {
        if(idx < 0) {
            setSelected(-1);
            setControlLevel(-1);
            return
        }
        setSelected(idx);
        props.lights.enableEdit(idx)
        const level = GetLightTypeId(props.lights.lightsTypeinfo[idx].type)
        setControlLevel(level)
        const col = props.lights.lights[idx].color

        setColor({
            r: col.r * 255, g: col.g * 255, b:col.b * 255
        })
        if(level >= 1) { // points & spot
            setIntensity(props.lights.lights[idx].intensity);
            setDistance((props.lights.lights[idx] as any).distance);
        }
        if(level >= 2) { // spot
            setDecay((props.lights.lights[idx] as any).decay)
            setAngle((props.lights.lights[idx] as any).angle)
            setPenumbra((props.lights.lights[idx] as any).penumbra)
        }
    }

    const delEditingLight = ()=>{
        let next = (selected - 1)
        if(next < 0) {
            next = props.lights.lights.length - 1
        }
        props.lights.delLight(selected)
        setSelected(next)
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
                <ChromePicker color={color} onChange={e=>{
                    setColor({...e.rgb})
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
            {
                controlLevel>=2?
                <div>
                <Typography gutterBottom>
                Decay
                </Typography>
                <PrettoSlider
                min={0} max={30} step={0.2} valueLabelDisplay="auto"
                value={decay}
                defaultValue={0} onChange={(e,v:any)=>{
                    setDecay(v)
                    props.lights.editDecay(v)
                }}/>

                <Typography gutterBottom>
                Angle
                </Typography>
                <PrettoSlider 
                value={angle}
                min={0} max={2 * Math.PI} step={0.01} valueLabelDisplay="auto"
                defaultValue={0} onChange={(e,v:any)=>{
                    setAngle(v)
                    props.lights.editAngle(v)
                }}/>
                <Typography gutterBottom>
                Penumbra
                </Typography>
                <PrettoSlider 
                value={penumbra}
                min={0} max={30} step={0.2} valueLabelDisplay="auto"
                defaultValue={0} onChange={(e,v:any)=>{
                    setPenumbra(v)
                    props.lights.editPenumbra(v)
                }}/>

                </div>
                :null
            }
            </Grid>


            <Grid item xs >
            <FormControl component="fieldset">
                <FormLabel component="legend">Pick Lights in the Scene</FormLabel>
                <RadioGroup aria-label="pick-lights" 
                    name="pick-lights" value={selected} 
                    onChange={(e, v)=>{
                        SetEditingLight(Number(v))
                        
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


            <Grid item xs >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end"
                >
                    <Grid item xs >
                    <SpeedDial
                    ariaLabel="Add a Light"
                    icon={<SpeedDialIcon />}
                    onClose={()=>setOpenAddLight(false)}
                    onOpen={()=>setOpenAddLight(true)}
                    open={openAddLight}
                    direction='left'
                    >
                    {actions.map(action => (
                        <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={()=>AddLight(action.name)}
                        />
                    ))}
                    </SpeedDial>
                    </Grid>

                    <Grid item xs >
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={delEditingLight}
                    >
                        Delete
                    </Button>
                    </Grid>
                </Grid>
                </Grid>
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