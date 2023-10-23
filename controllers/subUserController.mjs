import subUserModel from "../models/subUserModel.mjs";


const addSubUser = async (req, res) => {
  try {
    const isSubUserExist = await subUserModel.findOne({
      email: req.body.email,
    });

    if (isSubUserExist) {
      return res.status(409).json({ message: "Sub user already exists!" });
    } else {
      const newSubUser = await subUserModel.create(req.body);
      if (!newSubUser) {
        return res.status(500).json({ message: "Failed to add subuser" });
      }
      return res.status(201).json({
        newSubUser,
        message: "User added successfully",
        statusCode: 201,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSubUsers = async (req, res) => {
  try {
    const subUsers = await subUserModel.find();
    if (!subUsers) {
      res.status(409).json({ message: "Error getting all the subUsers" });
    } else {
      res.status(201).json({
        message: "you have successfully retrieved all the subUsers",
        Data: subUsers,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSubUsersById = async (req, res) => {
  try {
    const subUsers = await subUserModel.findOne({_id: req.params._id});
    if (!subUsers) {
      res.status(409).json({ message: "Error getting all the subUsers" });
    } else {
      res.status(201).json({
        message: "you have successfully retrieved all the subUsers",
        Data: subUsers,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersByLastModified = async (req, res) => {
  try {
    // Fetch users and sort them by the lastModifiedAt field in descending order (latest first)
    const users = await subUserModel.find().sort({ updatedAt: 1 });

    if (!users) {
      return res.status(409).json({ message: "Error getting users by last modified date" });
    }

    return res.status(200).json({
      message: "Users retrieved successfully by last modified date",
      Data: users,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateSubUsersById = async (req, res) => {
  try {
    let data = req.body
    delete data._id
    const subUsers = await subUserModel.updateOne({_id:req.params.id},{$set:data});
        if (!subUsers) {
      res.status(409).json({ message: "Error getting all the subUsers" });
    } else {
      res.status(201).json({
        message: "you have successfully retrieved all the subUsers",
        Data: subUsers,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteSubUser = async (req, res) => {
  try {
    const deletedUser = await subUserModel.deleteOne({
      _id: req.params.id,
    });
    
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Error occurred while deleting subuser" });
    } else {
      return res.status(200).json({
        message: "The subuser has been deleted successfully",
        data: deletedUser,
      });
    }

} catch (error) {
  res.status(500).json({ error: "Internal server error" });
}
};


export default {
  addSubUser,
  getSubUsers,
  getSubUsersById,
  updateSubUsersById,
  getUsersByLastModified,
  deleteSubUser
};
