import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
let blog
const mockHandlerUpdate = jest.fn()


beforeEach(() => {
  blog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 4,
    user: {
      username: 'testUser',
      name: 'testPerson'
    }
  }

  component = render(
    <Blog blog={blog} update={mockHandlerUpdate}/>
  )
})

test('renders correct content initially', () => {
  expect(component.container).toHaveTextContent(
    'testBlog'
  )

  expect(component.container).toHaveTextContent(
    'testAuthor'
  )

  expect(component.container).not.toHaveTextContent(
    'testUrl'
  )

  expect(component.container).not.toHaveTextContent(
    'Likes'
  )

  expect(component.container).not.toHaveTextContent(
    'Added by'
  )
})

test('renders correct content after view button clicked', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'testBlog'
  )

  expect(component.container).toHaveTextContent(
    'testAuthor'
  )

  expect(component.container).toHaveTextContent(
    'testUrl'
  )

  expect(component.container).toHaveTextContent(
    'Likes'
  )

  expect(component.container).toHaveTextContent(
    'Added by'
  )
})

test('each click on like button calls event handler once', () => {
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
})