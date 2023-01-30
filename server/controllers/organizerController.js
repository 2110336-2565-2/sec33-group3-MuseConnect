
// get organizers
const getOrganizers = async (req, res) => {
    res.status(200).json({success:true, msg:'Get organizers'});
}

// get organizer
const getOrganizer = async (req, res) => {
    res.status(200).json({success:true, msg:'Get organizer'});
}

// create organizer
const createOrganizer = async (req, res) => {
    res.status(200).json({success:true, msg:'Create organizer'});
}

// update organizer
const updateOrganizer = async (req, res) => {
    res.status(200).json({success:true, msg:'Update organizer'});
}

//delete organizer
const deleteOrganizer = async (req, res) => {
    res.status(200).json({success:true, msg:'Delete organizer'});
}

 
module.exports = {
    getOrganizers,
    getOrganizer,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer
}