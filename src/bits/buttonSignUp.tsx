import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'transparent',
    borderRadius: 3,
    borderStyle:'solid',
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    height: 30,
    width: 100,
    padding: '0 10px',
    margin:'0 5px',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


export default function SignUp() {
  return <StyledButton>SIGN UP</StyledButton>;
}