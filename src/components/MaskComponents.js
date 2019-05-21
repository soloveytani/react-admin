import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

const DateMask = (props) => {
    const { inputRef, ...other } = props;
  
    return (
        <MaskedInput
        {...other}
        ref={ ref => { inputRef(ref ? ref.inputElement : null); } }
        mask={[/\d/, /\d/, '/', /\d/, /\d/]}
        placeholderChar={'\u2000'}
        />
    );
}
  
DateMask.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


const PhoneMask = (props) => {
    const { inputRef, ...other } = props;
  
    return (
        <MaskedInput
        {...other}
        ref={ ref => { inputRef(ref ? ref.inputElement : null); } }
        mask={['+', /[1-9]/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        placeholderChar={'\u2000'}
        />
    );
}

PhoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export { DateMask, PhoneMask };