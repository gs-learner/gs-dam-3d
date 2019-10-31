import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { profile } from './store';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(90deg, rgba(53,53,53,1) 0%, rgba(255,182,10,1) 0%, rgba(255,156,75,1) 100%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    fontSize:20,
    height: 50,
    width: 180,
    padding: '0 10px',
    margin:'0 5px',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


export default function CommButton() {
  const pro = useContext(profile)

  return <StyledButton onClick={()=>{pro.to.community()}}>  COMMUNITY  </StyledButton>;
}