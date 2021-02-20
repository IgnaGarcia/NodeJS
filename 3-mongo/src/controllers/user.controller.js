const User = require('../models/user.model');

const getUserList = (req, res) => {
    User.find({}).exec((err, users) => {
        if(err) return res.status(500).json({ message: "Internal Server Error"});
        if(!users) return res.status(404).json({ message: "Users not found"});
        return res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });
    }); 
}

const createUser = (req, res) => {
    if(req.body && Object.keys(req.body).length > 0) {
        let user = new User(req.body);

        user.save((err, userStored) => {
            if(err) return res.status(500).json({ message: "Internal Server Error"});
            if(!userStored) return res.status(404).json({ message: "User not created"});
            return res.status(201).json({
                message: "User created successfully",
                data: user
            });
        });
    }
    else return res.status(400).json({ message: "User not received" });
}

const getUser = (req, res) => {
    const { id = null } = req.params;

    User.findById(id, (err, user) => {
        if(err) return res.status(500).json({ message: "Internal Server Error"});
        if(!user) return res.status(404).json({ message: `User ${id} not found` });
        return res.status(200).json({
            message: "User retrieved successfully",
            data: user
        });
    });
}

const updateUser = (req, res) => {
    const { id = null} = req.params;

    if(req.body && Object.keys(req.body).length > 0) {
        const update = req.body;

        User.findByIdAndUpdate(id, update, { new: true }, (err, userUpdated) => {
            if(err) return res.status(500).json({ message: "Internal Server Error"});
            if(!userUpdated) return res.status(404).json({ message: `User ${id} not found` });
            return res.status(200).json({
                message: "User updated successfully",
                data: userUpdated
            });
        });
    }
    else return res.status(400).json({ message: "User not received" });
}

const deleteUser = (req, res) => {
    const { id = null} = req.params;

    User.findByIdAndDelete(id, (err, userDeleted) => {
        if(err) return res.status(500).json({ message: "Internal Server Error"});
        if(!userDeleted) return res.status(404).json({ message: `User ${id} not found` });
        return res.status(204).json({ message: `User ${id} deleted successfully` });
    });
}

module.exports = {
    getUser,
    getUserList,
    createUser,
    updateUser,
    deleteUser
};