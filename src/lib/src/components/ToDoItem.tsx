import React from 'react'
import styled from 'styled-components'

interface TogglableProps {
  completed: boolean
}

interface ToDoItemProps extends TogglableProps {
  children: React.ReactNode
  index: number
  key: string
  onToggleComplete: React.ChangeEventHandler<HTMLInputElement>
}

const StyledListItem = styled.li<TogglableProps>`
  margin: 8px 2rem;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  cursor: pointer;
  word-wrap: break-word;
  position: relative;
`
const ToDoItemWrapper = styled.div`
  margin: 8px 44px;
  min-height: 44px;
`
const StyledLabel = styled.label<TogglableProps>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;

  &:before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: 40px;
    height: 40px;
    border: 2px solid black;
    border-radius: 50%;
    background-color: ${(props) => (props.completed ? 'black' : 'transparent')};
  }
  &:after {
    opacity: ${(props) => (props.completed ? '1' : '0')};
    position: absolute;
    left: 10px;
    top: 13px;
    content: '';
    width: 20px;
    height: 10px;
    border-width: 0 0 5px 5px;
    border-style: solid;
    border-color: #f7e754;
    transform: rotate(-45deg);
  }
`
const StyledCheckBox = styled.input`
  width: 44px;
  height: 44px;
  opacity: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
`

export const ToDoItem = React.forwardRef(
  (
    { completed, children, onToggleComplete, index, ...props }: ToDoItemProps,
    ref: React.ForwardedRef<HTMLLIElement>
  ) => {
    return (
      <StyledListItem completed={completed} {...props} ref={ref}>
        <ToDoItemWrapper>
          <StyledCheckBox
            type="checkbox"
            onChange={onToggleComplete}
            data-attribute-index={index}
            id={`checkbox-${index}`}
          />
          <StyledLabel
            completed={completed}
            htmlFor={`checkbox-${index}`}
            data-attribute-index={index}
            aria-hidden={true}>
            {children}
          </StyledLabel>
        </ToDoItemWrapper>
      </StyledListItem>
    )
  }
)
