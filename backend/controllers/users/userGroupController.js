const { isGroup } = require("../../helpers/users/helper")
const UserGroup = require("../../models/users/UserGroup")

// const { isUser } = require("../../helpers/helper");


// get all user groups
const getGroups = async (req, res) => {
    const groups = await UserGroup.find({}).sort({ created_at: -1 })
    res.status(200).json(groups)
}

// get a single group
const getGroup = async (req, res) => {
    const { id } = req.params


    const group = await UserGroup.findById(id)
    isGroup(group)

    res.status(200).json(group)
}



// delete specific user
const deleteGroup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such group" });
    }
  
    const group = await UserGroup.findOneAndDelete({ _id: id });
  
    if (!group) {
      return res.status(400).json({ error: "No such group" });
    }
  
    res.status(200).json(group);
}

// update a group
const updateGroup = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such group" });
    }
  
    const group = await UserGroup.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
  
    if (!group) {
      return res.status(400).json({ error: "No such group" });
    }
  
    res.status(200).json(group);
  };


// create group
const createGroup = async (req, res) => {
    const { name, desc } = req.body;

    try {
        const group = await UserGroup.create({
            name: name,
            desc: desc
        }).catch((error) => {
            res.status(200).json(error); 
        });


        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createGroup,
    getGroup,
    getGroups,
    deleteGroup,
    updateGroup
}