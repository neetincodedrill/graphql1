const models = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { AuthenticationError, ForbiddenError } = require('apollo-server-express')
require('dotenv').config();

module.exports = {
    addBook: async (parent,args) => {
        return await models.Book.create({
            title: args.title,
            author: args.author
        })
    },
    updateBook: async(parent,args) => {
        return await models.Book.findOneAndUpdate(
            {
                _id : args.id
            },
            {
                $set: {
                    title: args.title,
                    author: args.author
                }
            },
            {
                new: true
            }
        )
    },
    deleteBook: async(parent,args) => {
        try{
            await models.Book.findByIdAndDelete({_id : args.id})
            return true
        }catch(error){
            return false
        }
    },
    signUp: async(parent,{username,email,password}) => {
        //normalize the password
        const emailValid = email.trim().toLowerCase();

        //hash password
        const hashPassword = await bcrypt.hash(password,10);

        try{
           const user = await models.User.create({
               username,
               email:emailValid,
               password:hashPassword
           })

           //create and return jsonwebtoken
           return jwt.sign({ _id : user._id},process.env.JWT_SECRET)
        }catch(err){
           console.log(err)
           throw new Error('Error creating Account')
        }
    },
    login: async(parent,{username,email,password}) => {
        if(email){
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or:[{email,username}]
        });

        //if there is no user,throw an authentication error
        if(!user){
            throw new AuthenticationError('Error signing in')
        }

        //if the password don't match,throw an authentication error
        const valid = await bcrypt.compare(password,user.password)

        if(!valid){
            throw new AuthenticationError('Error signing in');
        }

        //create and return the json web token
        return jwt.sign({ id : user._id},process.env.JWT_SECRET)
    }
}