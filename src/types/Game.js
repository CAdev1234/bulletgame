import PropTypes from 'prop-types';
export const GameStatus = {
    Init: 'Init',
    Start: 'Start',
    Lost: 'Lost',
    Next: 'Next',
    Win: 'Win',
};
export const User = {
    account: PropTypes.string,
    score: PropTypes.number,
    level: PropTypes.number
};