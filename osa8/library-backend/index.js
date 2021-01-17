const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const password = process.argv[2]

const MONGODB_URI = `mongodb+srv://fullstack:${password}@cluster0.6ik6h.mongodb.net/library?retryWrites=true&w=majority`

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false, useCreateIndex: true})
  .then(() => {
    console.log('connected to', MONGODB_URI)
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      result = await Book.find({}).populate('author')
      // console.log('found books:', result)
      // if (args.author) {
      //   result = result.filter(b => b.author === args.author)
      // }
      if (args.genre) {
        result = result.filter(b => b.genres.includes(args.genre))
      }
      return result
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root.id }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        author.save()
      }
      const book = new Book({ ...args, author: author })
      return book.save()
    },
    editAuthor: (root, args) => {
      author = Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
