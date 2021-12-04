import * as React from 'react'
import styled from 'styled-components'

interface ToDo {
  toDo: string
  completed: boolean
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
  const [toDoList, setToDoList] = React.useState<ToDo[]>([
    {
      toDo: 'lol',
      completed: false,
    },
    {
      toDo: 'abcd',
      completed: true,
    },
  ])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const toggleToDo = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    const { target } = event
    const index = (target as HTMLLIElement).attributes['data-attribute-index']
      .value
    const newToDoList = [...toDoList]
    newToDoList[index].completed = !newToDoList[index].completed
    setToDoList(newToDoList)
  }

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
      <StyledInput ref={inputRef} placeholder={'Add new to-do to list...'} />
    </Wrapper>
  )
}
