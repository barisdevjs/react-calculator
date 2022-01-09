import { ACTIONS } from './App'


export default function ZeroButton({dispatch, digit}) {
    return (
        <button className='span-two'
        onClick={() => dispatch({type:ACTIONS.ADD_DIGIT, payload: {digit}})}
        >
            {digit}
        </button>
    )
}  