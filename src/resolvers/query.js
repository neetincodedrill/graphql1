const models = require('../models')
const context = require('../middleware/context')

module.exports = {
    hello: () => 'Hello World',
    books: async () => {
        return await models.Book.find()
    }, 
    book: async(parent,args) => {
        console.log(context)
        if(context === true){
            return await models.Book.findById(args.id);
        }
        else{
            return {
                'message' : "Invalid session"
            }
        }
    }
}