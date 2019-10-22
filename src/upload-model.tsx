import React, { useContext, useState, useEffect } from 'react'
import { profile } from './bits/store'
import Dialog from '@material-ui/core/Dialog'
import Dropzone from 'react-dropzone'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, withStyles, lighten } from '@material-ui/core/styles';
import { DisplayFileSize, toBase64 } from './utils/utils'
import LinearProgress from '@material-ui/core/LinearProgress';
import { MakeDefaultRenderConfig, APIUploadModel, AllModelCatalogs } from './utils/api'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core'

import './upload-model.css'
import {  deepOrange } from '@material-ui/core/colors'

interface WaitingItemProps {
    file: File
    index: number
    active: number
    onDone: (idx:number)=>any
}

const useWaitingStyle = makeStyles((theme: Theme) => ({
    paper: {
        whiteSpace: 'normal',
        overflow: 'hidden',
        // marginBottom: theme.spacing(1),
        // padding:'10px',
    },
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom:theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(2),
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        marginBottom:theme.spacing(1),
        minWidth: 120,
      },
    progressBar: {
        height: 25,
        //backgroundColor: theme.palette.secondary.dark
    }
  }));

  

  const ColorLinearProgress = withStyles((theme:Theme)=>({
    colorSecondary:{
      backgroundColor: deepOrange[100],
    },
    barColorSecondary:{
        backgroundColor:deepOrange[300],
    },
    colorPrimary: {
      backgroundColor: lighten(theme.palette.primary.light,0.3),
    },
    barColorPrimary: {
      backgroundColor: lighten(theme.palette.primary.main, 0.3),
    },
  }))(LinearProgress);

const WaitingItem: React.FC<WaitingItemProps> = (props)=>{
    const [completed, setCompleted] = useState(0)
    const classes = useWaitingStyle()
    const [name, setName] = useState('')
    const [catagory, setCatagory] = useState(0)
    const [isloaded,setIsloaded] = useState(true)
    const [overState, setOverState] = useState(false)
    
    const Upload = async ()=>{
        let base = await toBase64(props.file, (f)=>{
            setCompleted(f * 10)
        });
        console.log(base)
        if(base === null) {
            props.onDone(props.index)
            return
        }
        try{
            let res = await APIUploadModel({
                model: base,
                name: name,
                filename: props.file.name,
                catalog: AllModelCatalogs[catagory],
                tags: new Array<string>(),
                render_config: MakeDefaultRenderConfig()
            }, (f)=>{
                setCompleted(10 + f * 90)
            });
            if(res.ok) {
                console.log('succeed');
                setIsloaded(true);
            }
            else {
                console.log('failed');
                setIsloaded(false);
            }
            
            setOverState(true);
            setCompleted(100);
            props.onDone(props.index)
        }
        catch(e){
            console.log(e)
            console.log('changed')
            
            setIsloaded(false);
            setOverState(true);
            setCompleted(100);
            props.onDone(props.index);
        }
    }

    useEffect(()=>{
        if(props.index === props.active) {
            Upload()
        }
        // We dont care anout how upload is chaned
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.index, props.active, props.file])

    useEffect(()=>{
        setName(props.file.name)
    }, [props.file])
    
    const inputLabel = React.useRef<HTMLLabelElement>(null);
        const [labelWidth, setLabelWidth] = React.useState(0);
        React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    return(
        <Paper className={classes.paper}>
            <TextField
                id="outlined-uncontrolled"
                label="Name of the Model"
                defaultValue="foo"
                className={classes.textField}
                // margin="normal"
                variant="outlined"
                value={name}
                onChange={e=>setName(e.target.value)}
                margin="dense"
            />
            <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-catagory-simple">
                    Catagory
                </InputLabel>
                <Select
                value={catagory}
                onChange={(e)=>setCatagory(Number(e.target.value))}
                labelWidth={labelWidth}
                inputProps={{
                    name: 'Catagory',
                    id: 'outlined-catagory-simple',
                }}
                >
                {
                    AllModelCatalogs.map((v, idx)=>{return(
                        <MenuItem value={idx} key={idx}>{v}</MenuItem>
                    )})
                }
                </Select>
            </FormControl>
            <Grid container spacing={3}>
                <Grid item xs>
                    <div style={{position:'relative',height:'10px', zIndex:100000,color:'white',fontWeight:'bold'}}>
                        <div style={{position:'absolute',top:'12px'}}>
                            <Typography variant='subtitle2'>
                            {DisplayFileSize(props.file.size)}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs>
                    <div style={{position:'relative',height:'10px', zIndex:100000,color:'white',fontWeight:'bold'}}>
                        <div style={{position:'absolute',top:'12px',width:'100%'}}>
                            <div style={{float:'right'}}>
                            <Typography variant='subtitle2'>
                                {overState?(isloaded?
                                    (<img src='/image/right.png' alt='avatar' width='20px' height='20px'></img>)
                                    :(<img src='/image/wrong.png' alt='avatar' width='20px' height='20px'></img>))
                                    :''}
                            </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <ColorLinearProgress className={classes.progressBar} variant="determinate" value={completed} color={isloaded?'primary':'secondary'}/>
        </Paper>
    )
}

const HEADER_LINE = 100 as const

const useStyle = makeStyles((theme: Theme) => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        height: HEADER_LINE,
        width: '100%',
        verticalAlign: 'middle',
        textAlign: 'center',
        fontSize: 20,
    },
    header_accent: {
        fontWeight: 700,
        color: 'white',
        fontSize: 22,
        lineHeight: 2,
        fontFamily: 'Proxima Nova'
    },
    header_light: {
        fontWeight: 100,
        color: 'white',
        lineHeight: 2,
        fontSize: 20,
        fontFamily: 'Proxima Nova'
    },
    hint: {
        color: '#000000bb',
        fontFamily: 'Proxima Nova'
    },
    hintLink: {
        color: theme.palette.primary.light,
        fontFamily: 'Proxima Nova'
    },
    submitButton:{
        width:'100%',
        backgroundColor:'#2196f3',
        color:'white',
        '&:hover':{
            color:'black',
        },
    }
  }));

const UploadModel : React.FC = (props)=>{
    const pro = useContext(profile)
    const [files, setFiles] = useState(new Array<File>())
    const [uploading, setUploading] = useState(-1)
    const classes = useStyle()
    const [height, setHeight] = useState(80)
    const [open, setopen] = useState(false)

    
    if(!pro.user.username) {
         return null
    }

    function onDrop<T extends File>(acceptedFiles: T[], rejectedFiles: T[]) {
        // setUploading(0)
        setFiles(acceptedFiles)
        setHeight(100)
        setopen(true)
    }

    const onUploadDone = (idx : number) => {
        if(idx === files.length - 1) { // all files upload done
            //TODO: (redundancy)告诉用户上传完成
            setUploading(-1)
        }
        else {
            setUploading(idx + 1)
        }
    }

    

    return (
        <Dialog open={pro.open.uploadModel} onClose={()=>pro.trigger.uploadModel(false)} scroll='body'>
            <Grid container alignItems='center' className={classes.header} style={{height: height / 2}}>
                <Grid item xs>
                    <Typography display='inline' className={classes.header_accent}>
                        Upload
                    </Typography>
                    <Typography display='inline' className={classes.header_light}>
                        Models
                    </Typography>
                </Grid>
                
            </Grid>

            <Paper style={{maxHeight: '500px', overflow: 'auto'}}>
            {
                files.map((v, idx)=>
                    <WaitingItem
                        file={v}
                        index={idx}
                        active={uploading}
                        onDone={onUploadDone}
                        key={idx}
                    />
                )
            }
            </Paper>
            {(uploading < 0 && files.length)? <Button onClick={()=>setUploading(0)} className={classes.submitButton}>Submit</Button>:null}

            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    
                    <div {...getRootProps()} style={{textAlign:"center", backgroundColor: '#f1f5ff'}}>
                            <input {...getInputProps()} />
                            <div style={{padding:'20px'}}>
                                <div id="plusIcon" style={{
                                    borderStyle:"dashed",
                                    borderWidth:4,
                                    borderColor: '#00000020',
                                    borderRadius: 4,
                                    padding: 20,
                                    width: 'auto',
                                    boxSizing: 'border-box',
                                    backgroundImage:(open?'url(/image/plus.png)':'none'),
                                    backgroundRepeat:'no-repeat',
                                    backgroundSize:'100% 100%',
                                    }}>
                                        
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs>
                                
                                        <Typography className={classes.hint} display='inline'>
                                        {open?'':'Drag File here or'} <span> </span>
                                        </Typography>
                                        <Typography className={classes.hintLink} display='inline' style={{cursor:'pointer'}}>{open?'':'Browse'}</Typography>
                                        
                                        </Grid>
                                        
                                    </Grid>
                                    
                                </div>
                            </div>
                            
                    </div>
                )}
            </Dropzone>
        </Dialog>
    )
}
export default UploadModel