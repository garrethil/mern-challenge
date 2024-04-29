const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("Not authenticated");
            }

            return User.findOne({ _id: context.user._id }); 
   
        }
    },

    Mutation: {
        addUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            return { User };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("User not found");
            }

            const pswd = await user.isCorrectPassword(password);


            if (!pswd) {
                throw new AuthenticationError("Invalid password");
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_, { book }, context) => {
            if (!context.user) {
                return AuthenticationError;
            }
                const user = await User.findById(context.user._id);
                if (!user) {
                    throw new Error("User not found");                }
            user.savedBooks.push(book);

            await user.save();
            return user;
        },
        removeBook: async (_, { bookId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("Not authenticated");
            }
            
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: book.bookId }},
                { new: true }
            )
           if (!user) {
                throw new Error("User not found");
            }
            return user;
        }
    }
}