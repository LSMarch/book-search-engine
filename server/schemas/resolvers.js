const {AuthenticationError} = require('apollo-server-express');
const {bookSchema, User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, args) => {
            return User.findOne({
                $or: [{ _id: user ? user._id : args.id }, { username: args.username }],
            })
        }
    }
}

module.exports = resolvers;