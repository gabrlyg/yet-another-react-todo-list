import * as React from 'react'
import styled from 'styled-components'
import usePrevious from '../hooks/usePrevious'

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 20rem;
  overflow-y: scroll;
`

const getBoundingBoxes = (children: React.ReactNode) => {
  const boundingBoxes = {}
  React.Children.forEach(children, (child: any) => {
    const childRef = child.ref.current
    const boundingBox = childRef.getBoundingClientRect()
    boundingBoxes[child.key] = boundingBox
  })
  return boundingBoxes
}

export const AnimatedList = ({ children }: { children: React.ReactNode }) => {
  const [boundingBoxes, setBoundingBoxes] = React.useState({})
  const [prevBoundingBoxes, setPrevBoundingBoxes] = React.useState({})
  const prevChildren = usePrevious(children)

  React.useLayoutEffect(() => {
    const boundingBoxes = getBoundingBoxes(children)
    setBoundingBoxes(boundingBoxes)
  }, [children])

  React.useLayoutEffect(() => {
    const prevBoundingBoxes = getBoundingBoxes(prevChildren)
    setPrevBoundingBoxes(prevBoundingBoxes)
  }, [prevChildren])

  React.useEffect(() => {
    const hasPrevBoundingBoxes = Object.keys(prevBoundingBoxes).length > 0
    if (hasPrevBoundingBoxes) {
      React.Children.forEach(children, (child: any) => {
        const childNode = child.ref.current
        const firstPosition = prevBoundingBoxes[child.key]
        const lastPosition = boundingBoxes[child.key]
        const distanceY = firstPosition
          ? firstPosition.top - lastPosition.top
          : 0

        if (distanceY !== 0) {
          requestAnimationFrame(() => {
            childNode.style.transform = `translateY(${distanceY}px)`
            childNode.style.transition = 'transform 0ms'

            requestAnimationFrame(() => {
              childNode.style.transform = ''
              childNode.style.transition = 'transform 250ms'
            })
          })
        }
      })
    }
  }, [boundingBoxes, prevBoundingBoxes, children])

  return <StyledList>{children}</StyledList>
}
