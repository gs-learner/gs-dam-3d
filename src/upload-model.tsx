import React, { useContext, useState, useEffect } from 'react'
import { profile } from './bits/store'
import Dialog from '@material-ui/core/Dialog'
import Dropzone from 'react-dropzone'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DisplayFileSize, toBase64 } from './utils/utils'
import LinearProgress from '@material-ui/core/LinearProgress';
import { MakeDefaultRenderConfig, APIUploadModel, ModelCatalog, AllModelCatalogs } from './utils/api'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core'
import { textAlign } from '@material-ui/system'

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
        marginBottom: theme.spacing(1)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(2),
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        marginBottom:theme.spacing(1),
        minWidth: 120,
      },
  }));

const WaitingItem: React.FC<WaitingItemProps> = (props)=>{
    const [completed, setCompleted] = useState(0)
    const classes = useWaitingStyle()
    const [name, setName] = useState('')
    const [catagory, setCatagory] = useState(0)
    
    const Upload =  async ()=>{
        let base = await toBase64(props.file, (f)=>{
            setCompleted(f * 10)
        });
        
        if(base === null) {
            props.onDone(props.index)
            return
        }
        try{
            let res = await APIUploadModel({
                model: base,
                name: name,
                catalog: AllModelCatalogs[catagory],
                tags: new Array<string>(),
                render_config: MakeDefaultRenderConfig()
            }, (f)=>{
                setCompleted(10 + f * 90)
            });
            if(res.ok) {
                //TODO: Tell User
            }
            else {
                //TODO: 进度条标红?
                //TODO: Tell User
            }
            props.onDone(props.index)
        }
        catch(e){
            console.log(e)
            props.onDone(props.index);
            //TODO: Log eror
        }
    }

    useEffect(()=>{
        setCompleted(0)
        if(props.index === props.active) {
            
            Upload()
        }
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
                margin="normal"
                variant="outlined"
                value={name}
                onChange={e=>setName(e.target.value)}
            />
            <FormControl variant="outlined" className={classes.formControl}>
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
            <Typography variant='subtitle2'>
                {DisplayFileSize(props.file.size)}
            </Typography>
            <LinearProgress variant="determinate" value={completed}/>
        </Paper>
    )
}

const UploadModel : React.FC = (props)=>{
    const pro = useContext(profile)
    const [files, setFiles] = useState(new Array<File>())
    const [uploading, setUploading] = useState(-1)
    
    if(!pro.user.username) {
         return null
    }

    function onDrop<T extends File>(acceptedFiles: T[], rejectedFiles: T[]) {
        // setUploading(0)
        setFiles(acceptedFiles)
    }

    const onUploadDone = (idx : number) => {
        if(idx === files.length - 1) { // all files upload done
            //TODO: 告诉用户上传完成
            setUploading(-1)
        }
        else {
            setUploading(idx + 1)
        }
    }

    

    return (
        <Dialog open={pro.open.uploadModel} onClose={()=>pro.trigger.uploadModel(false)}>
            <Dropzone onDrop={onDrop} >
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()} style={{height: 200, textAlign:"center"}}>
                            <input {...getInputProps()} />
                            <div style={{
                                position:'relative',
                                top:'35%',
                                borderStyle:"dashed",
                                borderWidth:"1px",
                                paddingTop:'20px',
                                paddingBottom:'20px',
                                }}>
                                Drag 'n' drop some files here, or click to select files
                            </div>
                    </div>
                    </section>
                )}
            </Dropzone>
            <Paper>
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
            {(uploading < 0 && files.length)? <Button onClick={()=>setUploading(0)}>Submit</Button>:null}
        </Dialog>
    )
}
export default UploadModel