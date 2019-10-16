import React, { useContext } from 'react'
import { profile } from './bits/store'
import Dialog from '@material-ui/core/Dialog'
import Dropzone from 'react-dropzone'


const UploadModel : React.FC = (props)=>{
    const pro = useContext(profile)
    if(!pro.user.username) {
        return null
    }
    return (
        <Dialog open={pro.open.uploadModel} onClose={()=>pro.trigger.uploadModel(false)}>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
            </Dropzone>
        </Dialog>
    )
}
export default UploadModel