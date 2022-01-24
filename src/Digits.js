import { ACTIONS } from './App'
import './App.css';

export const zeroButton = 'span-two'

export default function DigitButton({dispatch, digit}) {
    return (
        <button
        onClick={() => dispatch({type:ACTIONS.ADD_DIGIT, payload: {digit}})}
        >
            {digit}
        </button>
    )
}  