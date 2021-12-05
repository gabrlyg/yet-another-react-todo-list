import styled from 'styled-components'

interface ToDoItemProps {
  completed: boolean
}

export const StyledListItem = styled.li<ToDoItemProps>`
  padding-left: 2rem;
  padding-right: 2rem;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  cursor: pointer;
  word-wrap: break-word;

  &:hover {
    background-color: #ffde47;
  }
`
