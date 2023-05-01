import Logo from '../../imgs/logo.png'
import './title.css';

export const Title = () => {
    return (
        <div className="title">
            <img src={Logo} width="60px" alt="the chat logo"/>
            <h1 className='maintitle'>websocket chat</h1>
        </div>
    )
}