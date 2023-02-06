const Worklog = require("../models/worklogModel");
// get portfolios
const getPortfolios = async (req, res) => {
  const id = req.params.id;
  const { p, m } = req.query;
  try {
    const portfolios = await Worklog.find({ user_id: id })
      .sort(req.body.sort)
      .skip(p * m)
      .limit(m);
    res.status(200).json({ result: portfolios });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get portfolio
const getPortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const portfolio = await Worklog.findById(id);
    if (portfolio.user_id !== req.body.user_id) {
      throw Error("Invalid User Id");
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create portfolio
const createPortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const portfolio = await Worklog.create(req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update portfolio
const updatePortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    delete req.body.user_id;
    const portfolio = await Worklog.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete portfolio
const deletePortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const portfolio = await Worklog.findByIdAndDelete(id);
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
