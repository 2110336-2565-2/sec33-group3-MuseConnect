
// get organizers
const getOrganizers = async (req, res) => {
    res.status(200).json({success:true, msg:'Get organizers'});
}

// get organizer
const getOrganizer = async (req, res) => {
    res.status(200).json({success:true, msg:'Get organizer'});
}

module.exports = {
    getOrganizers,
    getOrganizer,
}