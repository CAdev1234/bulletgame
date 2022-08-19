import React from 'react';
import PropTypes from 'prop-types';
const Button = ({
    lottieItem,
    type,
    onClick
}) => {
    return(
        <>
            <button className='lottieBtn' onClick={() => {onClick()}}>
                {lottieItem}
            </button>
        </>
    )
}

Button.prototype = {
    lottieItem: PropTypes.element,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['lottie']).isRequired
}
export default Button;