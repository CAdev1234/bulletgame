import PropTypes from 'prop-types';
import useSound from 'use-sound';
import { User } from '../types/game';
import Helper from '../lib/common';
import Button from './customButton';
import btnClickAudio from '../assets/audio/btnClick.wav';

const UserStats = ({
    user,
    onConnect,
    onDisconnect
}) => {
    const [btnClickPlay] = useSound(btnClickAudio);
    const connect =() => {
        btnClickPlay();
        onConnect();
    }
    const disconnect = () => {
        btnClickPlay();
        onDisconnect();
    }
    return (
        <>
            <div className="playerStat">
                {user.account && <h3>Account: {Helper.ellipseAddress(user.account)}</h3>}
                {user.account && <Button type="gradient" label="Disconnect" onClick={() => {disconnect()}} />}
                {!user.account && <Button type="gradient" label="Wallet Connect" onClick={() => {connect()}} />}
                <h3>Level: {user.level}</h3>
                <h3>Score: {user.score}</h3>
            </div>
        </>
    )
}
UserStats.prototype = {
    user: PropTypes.shape(User),
    onConnect: PropTypes.func.isRequired,
    onDisconnect: PropTypes.func.isRequired,
}
export default UserStats;