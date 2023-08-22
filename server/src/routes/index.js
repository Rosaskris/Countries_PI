const { Router } = require("express");
const populateDB = require("../controllers/populateDB");
const getCountries = require("../controllers/getCountries");
const getCountryById = require("../controllers/getCountryById");
const getCountryByName = require("../controllers/getCountryByName");
const postActivity = require("../controllers/postActivity");
const getActivities = require("../controllers/getActivities");

const router = Router();

router.get("/populate", populateDB );
router.get("/countries", getCountries);
router.get("/country/:id", getCountryById);
router.get("/country", getCountryByName);
router.post("/activities", postActivity);
router.get("/activities", getActivities)



module.exports = router;
