import * as React from 'react'
import styled from 'styled-components'

interface ToDo {
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
interface ToDoItemProps {
  completed: boolean
}

const Wrapper = styled.div`
  max-width: 42rem;
  min-height: 20rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #c8c0d1;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
`
const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`
const StyledListItem = styled.li<ToDoItemProps>`
  padding-left: 2rem;
  padding-right: 2rem;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  cursor: pointer;

  &:hover {
    background-color: #c5b8d4;
  }
`
const StyledInput = styled.input`
  margin-left: 2rem;
  margin-right: 2rem;
  border: none;
  line-height: 2rem;
  outline: 2px solid transparent;
  transition: outline 400ms;

  :focus {
    outline: 2px solid red;
    outline-offset: 2px;
  }
`

export const ToDoList = () => {
  const reducer = (state: ToDo[], action: ToDoAction): ToDo[] => {
    console.log('action:', action)
    switch (action.type) {
      case ToDoActionType.ADD:
        return [
          ...state,
          {
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
        return state.map((value, index) =>
          index == action.index
            ? {
                ...value,
                completed: !value.completed,
              }
            : value
        )
    }
  }
  const [toDoList, dispatchToDo] = React.useReducer(reducer, [
    {
      toDo: 'lol',
      completed: false,
    },
    {
      toDo: 'abcd',
      completed: true,
    },
  ])
  const [newToDo, setNewToDo] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const toggleToDo = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    const { target } = event
    const index = (target as HTMLLIElement).attributes['data-attribute-index']
      .value
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

  // React.useEffect(() => {
  //   console.log('toDos:', toDoList)
  // }, [toDoList])

  return (
    <Wrapper>
      <StyledList>
        {toDoList.map((toDo, index) => (
          <StyledListItem
            key={`todo-${index}`}
            completed={toDo.completed}
            data-attribute-index={index}
            onClick={toggleToDo}>
            {toDo.toDo}
          </StyledListItem>
        ))}
      </StyledList>
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
