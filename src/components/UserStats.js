import PropTypes from 'prop-types';
import { User } from '../types/Game';
const UserStats = ({
    user
}) => {
    return (
        <>
            <div className="playerStat">
                <h3>Account: {user.account}</h3>
                <h3>Level: {user.level}</h3>
                <h3>Score: {user.score}</h3>
            </div>
        </>
    )
}
UserStats.prototype = {
    user: PropTypes.shape(User)
}
export default UserStats;