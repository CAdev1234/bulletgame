import React from 'react';
import PropTypes from 'prop-types';
const Button = ({
    lottieItem,
    type,
    label,
    onClick
}) => {
    return(
        <>
            {type === 'lottie' && <button className='lottieBtn' onClick={() => {onClick()}}>
                {lottieItem}
            </button>}
            {type === 'gradient' && <button className='gradientBtn' onClick={() => {onClick()}}>
                {label}
            </button>}
        </>
    )
}

Button.prototype = {
    lottieItem: PropTypes.element,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['lottie']).isRequired,
    label: PropTypes.string
}
export default Button;