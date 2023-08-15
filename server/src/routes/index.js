const { Router } = require("express");
const populateDB = require("../controllers/populateDB");
const getCountries = require("../controllers/getCountries");
const getCountryById = require("../controllers/getCountryById");

const router = Router();

router.get("/populate", populateDB );
router.get("/countries", getCountries);
router.get("/countries/:id", getCountryById)


module.exports = router;
