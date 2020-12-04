import React from 'react'
import { Link } from 'react-router-dom'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core'


const BlogList = ({ blogs }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Button to={`/blogs/${blog.id}`} component={Link} color="primary">
                  {blog.title}
                </Button>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
              <TableCell>
                {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
              </TableCell>
              <TableCell>
                {blog.comments.length} {blog.comments.length === 1 ? 'comment' : 'comments'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList