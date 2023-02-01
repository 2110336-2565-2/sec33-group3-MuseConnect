
// get admin
const getAdmin = async (req, res) => {
    res.status(200).json({success:true, msg:'Get admin'});
}

// create admin
const createAdmin = async (req, res) => {
    res.status(200).json({success:true, msg:'Post admin'});
}

//update admin
const updateAdmin = async (req, res) => {
    res.status(200).json({success:true, msg:'Put admin'});
}

//delete admin
const deleteAdmin = async (req, res) => {
    res.status(200).json({success:true, msg:'Delete admin'});
}

 
module.exports = {
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
}