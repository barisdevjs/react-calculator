import { ACTIONS } from './App'



export default function OperationButton({dispatch, operation}) {
    return (
        <button className='yellow'
        onClick={() => dispatch({type:ACTIONS.CHOOSE_OP, payload: {operation}})}
        >
            {operation}
        </button>
    )
}  

