import * as React from 'react'
import styled from 'styled-components'
import { AnimatedList } from './AnimatedList'
import { StyledListItem } from './ListItem'

interface ToDo {
  id: string
  toDo: string
  completed: boolean
}
enum ToDoActionType {
  TOGGLE,
  ADD,
  EDIT,
  DELETE,
}
interface ToDoAction {
  type: ToDoActionType
  index?: number
  toDo?: string
}

const Wrapper = styled.div`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #f7e754;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  font-family: monospace;
  font-size: 24px;
  font-weight: 700;
`

const StyledInput = styled.input`
  margin-left: 2rem;
  margin-right: 2rem;
  line-height: 2rem;
  outline: 2px solid transparent;
  transition: border 400ms;
  padding: 8px;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #edc615;
  font-family: monospace;
  font-weight: 700;
  font-size: inherit;

  :focus {
    border-bottom: 2px solid #dba400;
  }
`

const markComplete = (state: ToDo[], index: number) => {
  const newState = state.filter((_, i) => i !== index)
  newState.push({
    ...state[index],
    completed: true,
  })
  return newState
}
const markNotComplete = (state: ToDo[], index: number) => {
  const notCompleteList = state.filter((item) => !item.completed)
  const completeList = state.filter((item, i) => item.completed && i !== index)
  notCompleteList.push({
    ...state[index],
    completed: false,
  })
  return [...notCompleteList, ...completeList]
}

export const ToDoList = () => {
  const reducer = (state: ToDo[], action: ToDoAction): ToDo[] => {
    switch (action.type) {
      case ToDoActionType.ADD:
        return [
          ...state,
          {
            id: `todo-${Date.now()}`,
            toDo: action.toDo!,
            completed: false,
          },
        ]
      case ToDoActionType.DELETE:
        return state.filter((_, index) => index != action.index)
      case ToDoActionType.EDIT:
        return state.map((value, index) =>
          index == action.index
            ? {
                ...value,
                toDo: action.toDo!,
              }
            : value
        )
      case ToDoActionType.TOGGLE:
        const index = action.index!
        const isCompleted = state[index].completed
        const newState = isCompleted
          ? markNotComplete(state, index)
          : markComplete(state, index)
        return newState
      default:
        return []
    }
  }
  const [toDoList, dispatchToDo] = React.useReducer(reducer, [])
  const [newToDo, setNewToDo] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const toggleToDo = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    const { target } = event
    const index = parseInt(
      (target as HTMLLIElement).attributes['data-attribute-index'].value
    )
    dispatchToDo({
      type: ToDoActionType.TOGGLE,
      index,
    })
  }
  const handleInputChange = () => {
    const value = inputRef?.current?.value || ''
    setNewToDo(value)
  }
  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event
    if (key === 'Enter') {
      dispatchToDo({ type: ToDoActionType.ADD, toDo: newToDo })
      setNewToDo('')
    }
  }

  return (
    <Wrapper>
      <AnimatedList>
        {toDoList.map(({ toDo, id, completed }, index) => (
          <StyledListItem
            key={id}
            completed={completed}
            data-attribute-index={index}
            onClick={toggleToDo}
            ref={React.createRef()}>
            {toDo}
          </StyledListItem>
        ))}
      </AnimatedList>
      <StyledInput
        ref={inputRef}
        placeholder={'Add new to-do to list...'}
        value={newToDo}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </Wrapper>
  )
}
