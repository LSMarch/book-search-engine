const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                return User.findOne({_id: context.user._id});
            };
        },
    },
    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
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

        saveBook: async (parent, {userId, book}, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    {_id: userId},
                    {$addToSet: {savedBooks: book}},
                    {
                        new: true,
                        runValidators: true,
                    },
                );
            };
            throw new AuthenticationError('You need to be logged in')
        },

        removeBook: async (parent, {book}, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: book}},
                    {new: true},
                );
            }
            throw new AuthenticationError('You need to be logged in');
        },

        saveBook: async (parent, [book], context) => {

        }
    },
};

module.exports = resolvers