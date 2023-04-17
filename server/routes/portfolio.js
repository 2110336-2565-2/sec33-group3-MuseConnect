const router = require("express").Router();

// controller functions
const {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth)

// get portfolios
router.get("/", getPortfolios);

// get a portfolio
router.get("/musician/:id", getPortfolio);

// post portfolio
router.post("/:id", createPortfolio);

// put portfolio
router.put("/:id", updatePortfolio);

// delete portfolio
router.delete("/:id", deletePortfolio);

module.exports = router;
