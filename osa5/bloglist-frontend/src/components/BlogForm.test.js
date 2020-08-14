import React from 'react'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'


test.only('eventhandler called with correct data', () => {
  const mockCreateBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={mockCreateBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: 'testTitle' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'testAuthor' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'testUrl' }
  })

  const form = component.container.querySelector('form')

  fireEvent.submit(form)

  expect(mockCreateBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('testUrl')

})
