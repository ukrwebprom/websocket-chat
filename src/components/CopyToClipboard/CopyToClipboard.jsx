import { useCopyToClipboard } from 'usehooks-ts'
import { RxCopy } from 'react-icons/rx';
import './copytoclipboard.scss';
import { Button, Input, InputAdornment } from '@mui/material';

export const CodeAndCopyToClipboard = ({code}) => {
    const [value, copy] = useCopyToClipboard();
    console.log(value);

    return (
        <>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu auctor lorem. Aenean aliquam, enim sagittis porta laoreet, nulla ante posuere purus,</p>
        <div className="code-line">
            <span className="code-line-text">{code}</span>
            <button type="button" onClick={() => copy(code)} className='code-line-btn'><RxCopy size={20}/></button>
            <Button variant="outlined">Enter chat</Button> 
        </div>
        </>
    )
}