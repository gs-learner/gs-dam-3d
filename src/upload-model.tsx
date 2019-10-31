import React, { useContext, useState, useEffect } from 'react'
import { profile } from './bits/store'
import Dialog from '@material-ui/core/Dialog'
import Dropzone from 'react-dropzone'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, withStyles, lighten } from '@material-ui/core/styles';
import { toBase64 } from './utils/utils'
import LinearProgress from '@material-ui/core/LinearProgress';
import { MakeDefaultRenderConfig, APIUploadModel, AllModelCatalogs } from './utils/api'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

import './upload-model.css'
import {  deepOrange } from '@material-ui/core/colors'

interface WaitingItemProps {
    file: File
    index: number
    active: number
    onDone: (idx:number)=>any
    globalTags: string[]
    catOverride: number
}

const useWaitingStyle = makeStyles((theme: Theme) => ({
    paper: {
        whiteSpace: 'normal',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.primary.light}`,
        marginTop: theme.spacing(1),
        position: 'relative',
        boxShadow: 'none'
    },
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginBottom:theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(2),
        marginRight:theme.spacing(2),
        marginBottom:theme.spacing(1),
        minWidth: 120,
      },
    progressBar: {
        height: 25,
        //backgroundColor: theme.palette.secondary.dark
    },
    backProgressBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        height: '100%'
    },
  }));

  

  const ColorLinearProgress = withStyles((theme:Theme)=>({
    colorSecondary:{
      backgroundColor: deepOrange[50],
    },
    barColorSecondary:{
        backgroundColor:deepOrange[100],
    },
    colorPrimary: {
      backgroundColor: lighten(theme.palette.primary.light,0.92),
    },
    barColorPrimary: {
      backgroundColor: lighten(theme.palette.primary.main, 0.65),
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
                tags: props.globalTags,
                render_config: MakeDefaultRenderConfig()
            }, (f)=>{
                setCompleted(10 + f * 90)
            });
            if(res.ok) {
                console.log('succeed');
                setIsloaded(true);
            }
            else {
                console.log('failed', res);
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

    useEffect(()=>{
        if(props.catOverride !== -1) {
            setCatagory(props.catOverride)
        }
    }, [props.catOverride])
    
    const inputLabel = React.useRef<HTMLLabelElement>(null);
        const [labelWidth, setLabelWidth] = React.useState(0);
        React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    return(
        <Paper className={classes.paper} style={{borderColor: (overState && !isloaded)?deepOrange[500]:''}}>
            <Grid container>
            <ColorLinearProgress className={classes.backProgressBar} variant="determinate" value={completed} color={isloaded?'primary':'secondary'}/>
                <Grid item xs={12} md={8}>
                <TextField
                    id="outlined-uncontrolled"
                    label="Name"
                    defaultValue="foo"
                    className={classes.textField}
                    variant="outlined"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    margin="dense"
                />
                </Grid>
                <Grid item xs={12} md={4}>
                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-catagory-single">
                        Catagory
                    </InputLabel>
                    <Select
                    value={catagory}
                    onChange={(e)=>setCatagory(Number(e.target.value))}
                    labelWidth={labelWidth}
                    inputProps={{
                        name: 'Catagory',
                        id: 'outlined-catagory-single',
                    }}
                    >
                    {
                        AllModelCatalogs.map((v, idx)=>{return(
                            <MenuItem value={idx} key={idx}>{v}</MenuItem>
                        )})
                    }
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
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
        // width:'100%',
        // backgroundColor:'#2196f3',
        // color:'white',
        // '&:hover':{
        //     color:'black',
        // },
        marginTop:theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        flexBasis: 200,
    },
    delIcon: {
        opacity: 0,
        '&:hover': {
            opacity: 1
        }
    },
    list: {
        paddingLeft: 10,
    },
    listgrid: {
        marginLeft: '6px'
    },
    tags:{
        backgroundColor: '#eeeff3'
    }
  }));

const UploadModel : React.FC = (props)=>{
    const pro = useContext(profile)
    const [files, setFiles] = useState(new Array<File>())
    const [uploading, setUploading] = useState(-1)
    const classes = useStyle()
    const [height, setHeight] = useState(80)
    // const [open, setopen] = useState(false)
    const [tags, setTags] = useState(new Array<string>())
    const [curTagIpt, setCurTagIpt] = useState('')
    const [catOverride, setCatOverride] = useState(-1)
    
    if(!pro.user.username) {
         return null
    }

    function onDrop<T extends File>(acceptedFiles: T[], rejectedFiles: T[]) {
        // setUploading(0)
        setFiles(acceptedFiles)
        setHeight(100)
        // setopen(true)
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

    const handleDelete = (idx:number)=>{
        const filtered = [...tags]
        filtered.splice(idx, 1);
        setTags(filtered)
    }

    const handleAddTags = ()=>{
        setTags([...tags, curTagIpt]);
        setCurTagIpt('')
    }
    const ClearAll = ()=>{
        setCatOverride(-1)
        setUploading(-1)
        setTags([])
        setFiles([])
        setCurTagIpt('')
    }

    return (
        <Dialog open={pro.open.uploadModel} onClose={()=>pro.trigger.uploadModel(false)} scroll='body'>
            <Grid container spacing={0}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                        {
                        files.length?
                        <div style={{
                            padding: 8,
                        }}>
                            <Button
                                fullWidth
                                variant='outlined'
                                onClick={ClearAll}
                            >
                                Reset
                            </Button> 
                            <FormControl variant="outlined" margin="dense" fullWidth>
                                <Select
                                value={catOverride}
                                onChange={(e)=>setCatOverride(Number(e.target.value))}
                                inputProps={{
                                    name: 'Catagory',
                                    id: 'outlined-catagory-simple',
                                }}
                                >
                                    <MenuItem value={-1} key={-1}>Set All Categories</MenuItem>
                                {
                                    
                                    AllModelCatalogs.map((v, idx)=>{return(
                                        <MenuItem value={idx} key={idx}>{v}</MenuItem>
                                    )})
                                }
                                </Select>
                            </FormControl>
                            </div>: null
                        }
                        
                        {
                        files.length?
                        <div className={classes.tags}>
                            
                            <TextField
                                id="add-to-tags"
                                variant="outlined"
                                label="Tags for All"
                                value={curTagIpt}
                                margin='dense'
                                onChange={(e)=>setCurTagIpt(e.target.value)}
                                className={clsx(classes.margin, classes.textField)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                            disabled={!Boolean(curTagIpt)}
                                            edge="end"
                                            aria-label="add tags"
                                            onClick={handleAddTags}
                                        >
                                        <AddIcon/>
                                        </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {
                            tags.length?
                            <List style={{paddingTop: 0}}>
                                {tags.map((tag, idx)=>
                                    <ListItem button dense className={classes.list}  key={idx}>
                                    <ListItemText
                                        primary={tag}
                                    />
                                    <ListItemSecondaryAction className={classes.delIcon}>
                                        <IconButton edge="end" aria-label="delete" onClick={()=>handleDelete(idx)}>
                                        <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                            </List>
                            :null
                            }
                        </div>
                        :null
                        }

                        </Grid>
                        <Grid item xs={8}>
                            <Paper style={{
                                maxHeight: '500px', 
                                overflow: 'auto',
                                paddingRight: files.length? 6:0
                            }}>
                            
                            {
                                files.map((v, idx)=>
                                    <WaitingItem
                                        file={v}
                                        index={idx}
                                        active={uploading}
                                        onDone={onUploadDone}
                                        key={idx}
                                        globalTags={tags}
                                        catOverride={catOverride}
                                    />
                                )
                            }
                            {(uploading < 0 && files.length)? 
                                <Button 
                                    fullWidth
                                    variant='outlined'
                                    onClick={()=>setUploading(0)} 
                                    className={classes.submitButton}
                                    color='primary'
                                >Submit</Button>
                                :null
                            }
                            </Paper>
                            
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Dropzone onDrop={onDrop}>
                        {({getRootProps, getInputProps}) => (
                            
                            <div {...getRootProps()} style={{textAlign:"center", backgroundColor: '#f1f5ff', outline:'none'}}>
                                    <input {...getInputProps()} />
                                    <div style={{padding:'20px', outline:'none'}}>
                                        <div id="plusIcon" style={{
                                            borderStyle:"dashed",
                                            borderWidth:4,
                                            borderColor: '#00000020',
                                            borderRadius: 4,
                                            padding: 20,
                                            width: 'auto',
                                            boxSizing: 'border-box',
                                            backgroundImage:(files.length?'url(/image/plus.png)':'none'),
                                            backgroundRepeat:'no-repeat',
                                            backgroundSize:'50% 100%',
                                            backgroundPositionX: '50%'
                                            }}>
                                                
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item xs>
                                                    <Typography className={classes.hint} display='inline'>
                                                    {files.length?'':'Drag File here or'} <span> </span>
                                                    </Typography>
                                                    <Typography className={classes.hintLink} display='inline' style={{cursor:'pointer'}}>{files.length?'':'Browse'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            
                                        </div>
                                    </div>
                                    
                            </div>
                        )}
                    </Dropzone>
                </Grid>
            </Grid>
            
            

        </Dialog>
    )
}
export default UploadModel