const Usermodel = require('../models/usermodel');


module.exports.createUser = async ({ name, email, password }) => {
    if(!name || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = new Usermodel({
        name,
        email,
        password
    });
    
    return await user.save();
}

