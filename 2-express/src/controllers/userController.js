var userList = require('../data').users;

const getUserList = (req, res) => {
    return res.status(200).json({
        message: "Users retrieved successfully",
        data: userList
    });
}

const getUser = (req, res) => {
    const { id = null } = req.params;
    if(userList[id]) return res.status(200).json({
        message: "User retrieved successfully",
        data: userList[id]
    });
    else return res.status(400).json({ message: `User ${id} not found` });
}

const createUser = (req, res) => {
    if(req.body && Object.keys(req.body).length > 0) {
        userList.push(req.body);
        return res.status(201).json({
            message: "User created successfully",
            data: req.body
        });
    }
    else return res.status(400).json({ message: "User not received" });
}

const updateUser = (req, res) => {
    const { id = null} = req.params;
    if(!userList[id]) return res.status(404).json({ message : `User ${id} not found` });
    else if(req.body && Object.keys(req.body).length > 0) {
        userList[id] = req.body;
        return res.status(200).json({
            message: "User updated successfully",
            data: req.body
        });
    }
    else return res.status(400).json({ message : "User not received" });
}

const deleteUser = (req, res) => {
    const { id = null} = req.params;
    if(!userList[id]) return res.status(404).json({ message : `User ${id} not found` });
    else{
        userList = userList.filter((_user, index) => index!= id);
        return res.status(204).json({ message : `User ${id} deleted successfully`});
    }
}

module.exports = {
    deleteUser,
    updateUser,
    getUser,
    getUserList,
    createUser
}