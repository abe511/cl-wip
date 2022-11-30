
import UserModel from "../models/userModel";


// READ

export const getUserById = async (req, res) => {
    try {
        const data = await UserModel.findById(req.params.userID);
        res.send(data);
    } catch(err) {
        res.status(404).json({message: "Not found"});
    }
}


// UPDATE

export const updateUserById = async (req, res) => {
    try {
        const data = await UserModel.findByIdAndUpdate(
            {_id: req.params.userID},
            req.body,
            {new: true}
        );
        res.send(data);
    } catch(err) {
        res.status(404).json({message: "Not found"});
    }
}


// DELETE

export const deleteUser = async (req, res) => {
    try {
        await UserModel.deleteOne({_id: req.params.userID});
        res.json({message: "Record removed"});
    } catch(err) {
        res.send(err);
    }
}

