import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Edit : React.FC = (props)=>{
    const [tag, setTag] = useState('')
    const [id, setId] = useState('')

    const upload = async ()=>{
        fetch('/api/set_tags', {
            method: 'POST',
            body: JSON.stringify({
                tags: [tag],
                id: id
            })
        })
    };

    return(
        <div>
        <TextField
            id="outlined-name"
            label="Tag"
            // className={classes.textField}
            value={tag}
            onChange={(v)=>setTag(v.target.value)}
            margin="normal"
            variant="outlined"
        />

        <TextField
            id="outlined-name"
            label="Id"
            // className={classes.textField}
            value={id}
            onChange={(v)=>setId(v.target.value)}
            margin="normal"
            variant="outlined"
        />

      <Button variant="outlined" color="primary" onClick={()=>upload()}>
        Submit
      </Button>
      </div>
    )
}

export default Edit;