import './App.css';
import { useReducer } from 'react'
import DigitButton from './Digits'
import ZeroButton from './Zero';
import OperationButton from './Operation'


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OP: 'operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {

    case ACTIONS.ADD_DIGIT:
      if ( state.overwrite) {
        return {
          ...state,
          current: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === '0' && state.current === '0') return state
      if (payload.digit === '.' && state.current.includes('.')) return state
      return {
        ...state,
        current: `${state.current || ''}${payload.digit}`,
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OP:
      if (state.current == null && state.previous == null) return state


      if (state.current == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.previous == null) {
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        }
      }

      return {
        ...state,
        previous: evaluate(state),
        operation: payload.operation,
        current: null,
      }
     
    case ACTIONS.DELETE_DIGIT:

      if ( state.current == null) return state


      if (state.current.length === 1) {
        return {
          ...state,
          current: null,
        }
      }

      return {
        ...state,
        current: state.current.slice(0, -1)
      }

    case ACTIONS.EVALUATE:
      if (
        state.current == null ||
        state.previous == null ||
        state.operation == null
      ) {
        return state
      }

      return {
        ...state,
        previous: null,
        operation: null,
        current: evaluate(state),
        overwrite: true, // overwrite the current value when you hit a number
      }

    default:
      break;
  }

}


function evaluate({ current, previous, operation }) {
  const prev = parseFloat(previous)
  const curr = parseFloat(current)
  if (isNaN(prev) || isNaN(curr)) return ''
  let computation = ''
  switch (operation) {
    case '+':
      computation = prev + curr
      break;
    case '-':
      computation = prev - curr
      break;
    case 'x':
      computation = prev * curr
      break;
    case '÷':
      computation = prev / curr
      break;
    default:
      break;
  }
  return computation.toString()
}

function App() {

  const [{ current, previous, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    <div className="grid">
      <div className="output">
        <div className='prev'>{previous} {operation}</div>
        <div className='curr'>{current}</div>
      </div>
      <button className='span-two red'
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button className='gray'
       onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      >DEL</button>
      <OperationButton operation='÷' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation='x' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <ZeroButton className={ZeroButton} digit='0' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <button className='yellow'
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >=
      </button>
    </div>
  )
}

export default App;
