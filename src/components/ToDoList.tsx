import * as React from 'react'
import styled from 'styled-components'

interface ToDoItemInterface {
  completed: boolean
}

const Wrapper = styled.ul`
  list-style: none;
  max-width: 42rem;
  min-height: 20rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 0;
  background-color: #c8c0d1;
  display: flex;
  flex-direction: column;
  text-align: left;
`
const StyledListItem = styled.li<ToDoItemInterface>`
  padding-left: 2rem;
  padding-right: 2rem;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  cursor: pointer;

  &:hover {
    background-color: #c5b8d4;
  }
`

const ToDoItem: React.FC = ({ children }) => {
  const [completed, setCompleted] = React.useState<boolean>(false)
  const onToDoClick = React.useCallback(() => {
    setCompleted(!completed)
  }, [completed])
  return (
    <StyledListItem completed={completed} onClick={onToDoClick}>
      {children}
    </StyledListItem>
  )
}

export const ToDoList = () => {
  return (
    <Wrapper>
      <ToDoItem>lol</ToDoItem>
      <ToDoItem>abcd</ToDoItem>
    </Wrapper>
  )
}
