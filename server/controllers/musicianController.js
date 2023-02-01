
// get musicians
const getMusicians = async (req, res) => {
    res.status(200).json({success:true, msg:'Get musician'});
}

// get musician
const getMusician = async (req, res) => {
    res.status(200).json({success:true, msg:'Get musician'});
}

module.exports = {
    getMusicians,
    getMusician,
}