const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]!
    }
    
    type Book {
        _id: ID
        authors: [String]
        bookId: String!
        image: String
        link: String
        title: String
        description: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookData {
        _id: ID
        authors: [String]
        bookId: String!
        image: String
        link: String
        title: String
        description: String
    }

    type Query {
        me: User
    }

    type mutations {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!):User
        saveBook(book: BookData):User
        removeBook(bookId: String!):User
    }
    `
