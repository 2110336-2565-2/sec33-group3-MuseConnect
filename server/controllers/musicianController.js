
// get musicians
const getMusicians = async (req, res) => {
    res.status(200).json({success:true, msg:'Get musician'});
}

// get musician
const getMusician = async (req, res) => {
    res.status(200).json({success:true, msg:'Get musician'});
}

// create musician
const createMusician = async (req, res) => {
    res.status(200).json({success:true, msg:'Create musician'});
}

// update musician
const updateMusician = async (req, res) => {
    res.status(200).json({success:true, msg:'Update musician'});
}

//delete musician
const deleteMusician = async (req, res) => {
    res.status(200).json({success:true, msg:'Delete musician'});
}

 
module.exports = {
    getMusicians,
    getMusician,
    createMusician,
    updateMusician,
    deleteMusician
}