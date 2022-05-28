const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userInfo = await User.findOne({_id: context.user._id})
                    .populate('books');
                return userInfo;
            };
            throw new AuthenticationError('Not logged in')
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {user,token};
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user) {
                throw new AuthenticationError('No user with this email');
            };
            const rightPw = await user.isCorrectPassword(password);
            if(!rightPw) {
                throw new AuthenticationError('Incorrect password');
            };

            const token = signToken(user);
            return {token,user};
        },

        saveBook: async (parent, {input}, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user.id},
                    {$addToSet: {savedBooks: input}},
                    {
                        new: true,
                        runValidators: true,
                    },
                );
            };
            throw new AuthenticationError('You need to be logged in')
        },

        removeBook: async (parent, {bookId}, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true},
                );
            }
            throw new AuthenticationError('You need to be logged in');
        },        
    },
};

module.exports = resolvers