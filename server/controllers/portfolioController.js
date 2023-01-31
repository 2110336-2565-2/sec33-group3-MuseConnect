
// get portfolios
const getPortfolios = async (req, res) => {
    res.status(200).json({success:true, msg:'Get portfolios'});
}

// get portfolio
const getPortfolio = async (req, res) => {
    res.status(200).json({success:true, msg:'Get portfolio'});
}

// create portfolio
const createPortfolio = async (req, res) => {
    res.status(200).json({success:true, msg:'Post portfolio'});
}

//update portfolio
const updatePortfolio = async (req, res) => {
    res.status(200).json({success:true, msg:'Put portfolio'});
}

//delete portfolio
const deletePortfolio = async (req, res) => {
    res.status(200).json({success:true, msg:'Delete portfolio'});
}

 
module.exports = {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
}