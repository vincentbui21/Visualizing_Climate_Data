const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
let multer = require('multer');
let upload = multer({ dest: 'uploads/' });
let csv = require('csvtojson');
let connectDB = require("./config/db");
let errorHandler = require("./middleware/errorHandler");
let LayoutRoute = require("./routes/LayoutRoute");


//Route declare
let V2router = require("./routes/V2route");
let V3router = require("./routes/V3route");
let V4router = require("./routes/V4route");
let V5router = require("./routes/V5route");
let V6router = require("./routes/V6Route");
let V7router = require("./routes/V7Route");
let V8router = require("./routes/V8Route");
let V9router = require("./routes/V9Route");
let authRoute = require("./routes/auth");
let userRoute = require("./routes/users");
//Global environment config
dotenv.config();

//Connect database
connectDB();

//Middleware set-up
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Model declared (Used for putting data to DB)
const V2 = require("./models/V2Model");
const V3 = require("./models/V3model");
const V4 = require("./models/V4model");
const V5 = require('./models/V5model');
const V6 = require("./models/V6model");
const V7 = require("./models/V7model");
const V8 = require("./models/V8model");
const V9 = require("./models/V9model");

//Port defined
const PORT = process.env.PORT || 8000;



//Set up route connection for charts
app.use("/v2", V2router);
app.use("/v3", V3router);
app.use("/v4", V4router);
app.use("/v5", V5router);
app.use("/v6", V6router);
app.use("/v7", V7router);
app.use("/v8", V8router);
app.use("/v9", V9router);




//users
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

//Set up route connection for layout

app.use("/layout", LayoutRoute);

//Error handling
app.use(errorHandler);



//Upload V1 dataset

// app.post("/", upload.single("file"), (req, res, next) => {
//     csv()
//     .fromFile(req.file.path)
//     .then(async (jsonObj) => {
//         let newArray = [];
//         jsonObj.forEach((obj) => {
//             let newObj = {};
//             let year = parseInt(obj.Time.split("-")[0]);
            
//             let stringOfMonth = obj.Time.split("-")[1];

//             let monthString = "";

//             if (stringOfMonth.charAt(0) === "0") {
//                 monthString += stringOfMonth.charAt(1);
//             } else {
//                 monthString += stringOfMonth;
//             }

//             let monthValue = parseInt(monthString);

//             newObj.year = year;
//             newObj.month = monthValue;
//             newObj.southern_monthly = parseFloat(obj.southern_monthly);
//             newObj.southern_annual = parseFloat(obj.southern_annual);
//             newObj.northern_monthly= parseFloat(obj.northern_monthly);
//             newObj.northern_annual = parseFloat(obj.northern_annual);
//             newObj.global_monthly = parseFloat(obj.global_monthly);
//             newObj.global_annual = parseFloat(obj.global_annual);
//             newObj.chartNumber = "v1";

//             newArray.push(newObj);
//         });
            
//         await V1Vi.insertMany(newArray);
//     }) 
// });


// Upload V2 dataset

//  app.post("/", upload.single("file"), (req, res, next) => {
//    csv()
//   .fromFile(req.file.path)
//     .then(async (jsonObj) => {
     
//         let newArray = [];

//         jsonObj.forEach((obj) => {
//             let newObj = {};
//             let valueOfNorthRecon = 0.0;
//             if (obj.northern_reconstruction === "") {
//                 valueOfNorthRecon = 0;
//             } else {
//                 valueOfNorthRecon = parseFloat(obj.northern_reconstruction);
//             }

//             let year = parseInt(obj.Time.split("-")[0]);
             
//             let stringOfMonth = obj.Time.split("-")[1];
             
//             let monthString = "";
             
//             if (stringOfMonth.charAt(0) === "0") {
//                 monthString += stringOfMonth.charAt(1);
//             } else {
//                 monthString += stringOfMonth;
//             }

//             newObj.year = parseInt(year);
//             newObj.month = parseInt(monthString);
//             newObj.southern_monthly = parseFloat(obj.southern_monthly);
//             newObj.southern_annual = parseFloat(obj.southern_annual);
//             newObj.northern_monthly = parseFloat(obj.northern_monthly);
//             newObj.northern_annual = parseFloat(obj.northern_annual);
//             newObj.global_monthly = parseFloat(obj.global_monthly);
//             newObj.global_annual = parseFloat(obj.global_annual);
//             newObj.northern_reconstruction = valueOfNorthRecon;
//             newObj.chartNumber = "v2";

//             newArray.push(newObj);
//         });

//         await V2.insertMany(newArray);
       
//      }) 
// });

//Upload V3 data

// app.post("/", upload.single("file"), (req, res, next) => {
//     csv()
//    .fromFile(req.file.path)
//      .then(async (jsonObj) => {
//        let newArray = [];
//         jsonObj.forEach((obj) => {
//            let newObj = {};
//            let year = parseInt(obj.Time.split("-")[0]);
             
//               let stringOfMonth = obj.Time.split("-")[1];
 
//               let monthString = "";
 
//              if (stringOfMonth.charAt(0) === "0") {
//                   monthString += stringOfMonth.charAt(1);
//              } else {
//                   monthString += stringOfMonth;
//              }
 
//              let monthValue = parseInt(monthString);
 
//              newObj.year = year;
//              newObj.month = monthValue;
//              newObj.monthly_average = parseFloat(obj['co2_monthly_avg(micromol/mol)']);
//              newObj.annual_average = parseFloat(obj['co2_annual_avg(micromol/mol)']);
//              newObj.chartNumber = "v3";
//             newArray.push(newObj);
        
//           });
 
       
      
//          await V3.insertMany(newArray);
       
//       }) 
//  });








 
//Upload V5 data

// app.post("/", upload.single("file"), async (req, res, next) => {
//     csv()
//    .fromFile(req.file.path)
//      .then(async (jsonObj) => {
        
//         let newArray = [];

//         jsonObj.forEach((obj) => {
//             let newObj = {};
//             let meanValue = parseFloat(obj['Mean_age_of_air(yr BP)']);
//             let concenValue = parseFloat(obj['CO2_concentration(ppmv)']);

//             newObj.meanAgeOfAir = meanValue;
//             newObj.carbondioxideConcen = concenValue;
//             newObj.chartNumber = "v5";
//             newArray.push(newObj);
//         });

//         await V5.insertMany(newArray);

        
//       }) 

   
//  });

//Upload V6 data

// app.post("/", upload.single("file"), async (req, res, next) => {
//     csv()
//    .fromFile(req.file.path)
//      .then(async (jsonObj) => {
        
//         let newArray = [];

//         jsonObj.forEach((obj) => {
//             let newObj = {};
            
//             newObj.ageGasCal = parseFloat(obj.age_gas_calBP);
//             newObj.carbondioxidePpm = parseFloat(obj.co2_ppm);
//             newObj.chartNumber = "v6";

//             newArray.push(newObj);
//         });

//         await V6.insertMany(newArray);
    

        
//       }) 
    
   
//  });

//Upload V8 data

/*app.post("/", upload.single("file"), async (req, res, next) => {
  csv()
    .fromFile(req.file.path)
      .then(async (jsonObj) => {
        
         let newArray = [];

         jsonObj.forEach((obj) => {
            let time = 0
            let chartNumber = ""
            let countries = []
            let countryNames = []
            let newObj = {time, countries,countryNames,chartNumber};
            
             newObj.time = parseFloat(obj.time);
             newObj.countryNames = ["Afghanistan",
             "Albania",
             "Algeria",
             "Andorra",
             "Angola",
             "Anguilla",
             "Antigua Barbuda",
             "Argentina",
             "Armenia",
             "Aruba",
             "Australia",
             "Austria",
             "Azerbaijan",
             "Bahamas",
             "Bahrain",
             "Bangladesh",
             "Barbados",
             "Belarus",
             "Belgium",
             "Belize",
             "Benin",
             "Bermuda",
             "Bhutan",
             "Bonaire Saint Eustatius and Saba",
             "Bosnia and Herzegovina",
             "Botswana",
             "Brazil",
             "British Virgin Islands",
             "Brunei Darussalam",
             "Bulgaria",
             "Burkina Faso",
             "Burundi",
             "Cambodia",
             "Canada",
             "Cape Verde",
             "Central African Republic",
             "Chad",
             "Chile",
             "China",
             "Colombia",
             "Comoros",
             "Congo",
             "Cook Islands",
             "Costa Rica",
             "Côte d'Ivoire",
             "Croatia",
             "Cuba",
             "Curaçao",
             "Cyprus",
             "Czech Republic",
             "North Korea",
             "Democratic Republic of the Congo",
             "Denmark",
             "Djibouti",
             "Dominica",
             "Dominican Republic",
             "Ecuador",
             "Egypt",
             "El Salvador",
             "Equatorial Guinea",
             "Eritrea",
             "Estonia",
             "Ethiopia",
             "Faeroe Islands",
             "Micronesia",
             "Fiji",
             "Finland",
             "France",
             "French Guiana",
             "French Polynesia",
             "Gabon",
             "Gambia",
             "Georgia",
             "Germany",
             "Ghana",
             "Greece",
             "Greenland",
             "Grenada",
             "Guadeloupe",
             "Guatemala",
             "Guinea",
             "Guinea_Bissau",
             "Guyana",
             "Haiti",
             "Honduras",
             "Hong Kong",
             "Hungary",
             "Iceland",
             "India",
             "Indonesia",
             "Iraq",
             "Ireland",
             "Iran",
             "Israel",
             "Italy",
             "Jamaica",
             "Japan",
             "Jordan",
             "Kazakhstan",
             "Kenya",
             "Kiribati",
             "Kosovo",
             "Kuwait",
             "Kyrgyzstan",
             "Laos",
             "Latvia",
             "Lebanon",
             "Lesotho",
             "Liberia",
             "Libya",
             "Liechtenstein",
             "Lithuania",
             "Luxembourg",
             "Macao",
             "North Macedonia",
             "Madagascar",
             "Malawi",
             "Malaysia",
             "Maldives",
             "Mali",
             "Malta",
             "Marshall Islands",
             "Martinique",
             "Mauritania",
             "Mauritius",
             "Mayotte",
             "Mexico",
             "Mongolia",
             "Montenegro",
             "Montserrat",
             "Morocco",
             "Mozambique",
             "Myanmar",
             "Namibia",
             "Nauru",
             "Nepal",
             "Netherlands",
             "New Caledonia",
             "New Zealand",
             "Nicaragua",
             "Niger",
             "Nigeria",
             "Niue",
             "Norway",
             "Occupied Palestinian Territory",
             "Oman",
             "Pakistan",
             "Palau",
             "Panama",
             "Papua New Guinea",
             "Paraguay",
             "Peru",
             "Philippines",
             "Bolivia",
             "Poland",
             "Portugal",
             "Qatar",
             "Cameroon",
             "South Korea",
             "Moldova",
             "South Sudan",
             "Sudan",
             "Réunion",
             "Romania",
             "Russian Federation",
             "Rwanda",
             "Saint Helena",
             "Saint Lucia",
             "Sint Maarten",
             "Samoa",
             "Sao Tome and Principe",
             "Saudi Arabia",
             "Senegal",
             "Serbia",
             "Seychelles",
             "Sierra Leone",
             "Singapore",
             "Slovakia",
             "Slovenia",
             "Solomon Islands",
             "Somalia",
             "South Africa",
             "Spain",
             "Sri Lanka",
             "Saint Kitts and Nevis",
             "Saint Pierre and Miquelon",
             "Saint Vincent and the Grenadines",
             "Suriname",
             "Swaziland",
             "Sweden",
             "Switzerland",
             "Syria",
             "Taiwan",
             "Tajikistan",
             "Thailand",
             "Timor Leste",
             "Togo",
             "Tonga",
             "Trinidad and Tobago",
             "Tunisia",
             "Turkey",
             "Turkmenistan",
             "Turks and Caicos Islands",
             "Tuvalu",
             "Uganda",
             "Ukraine",
             "United Arab Emirates",
             "United Kingdom",
             "Tanzania",
             "USA",
             "Uruguay",
             "Uzbekistan",
             "Vanuatu",
             "Venezuela",
             "Vietnam",
             "Wallis and Futuna Islands",
             "Yemen",
             "Zambia",
             "Zimbabwe"]
             
             newObj.countries = [
              obj.Afghanistan,
              obj.Albania,
              obj.Algeria,
              obj.Andorra,
              obj.Angola,
              obj.Anguilla,
              obj.Antigua_Barbuda,
              obj.Argentina,
              obj.Armenia,
              obj.Aruba,
              obj.Australia,
              obj.Austria,
              obj.Azerbaijan,
              obj.Bahamas,
              obj.Bahrain,
              obj.Bangladesh,
              obj.Barbados,
              obj.Belarus,
              obj.Belgium,
              obj.Belize,
              obj.Benin,
              obj.Bermuda,
              obj.Bhutan,
              obj.Bonaire_Saint_Eustatius_and_Saba,
              obj.Bosnia_and_Herzegovina,
              obj.Botswana,
              obj.Brazil,
              obj.British_Virgin_Islands,
              obj.Brunei_Darussalam,
              obj.Bulgaria,
              obj.Burkina_Faso,
              obj.Burundi,
              obj.Cambodia,
              obj.Canada,
              obj.Cape_Verde,
              obj.Central_African_Republic,
              obj.Chad,
              obj.Chile,
              obj.China,
              obj.Colombia,
              obj.Comoros,
              obj.Congo,
              obj.Cook_Islands,
              obj.Costa_Rica,
              obj.Côte_dIvoire,
              obj.Croatia,
              obj.Cuba,
              obj.Curaçao,
              obj.Cyprus,
              obj.Czech_Republic,
              obj.North_Korea,
              obj.Democratic_Republic_of_the_Congo,
              obj.Denmark,
              obj.Djibouti,
              obj.Dominica,
              obj.Dominican_Republic,
              obj.Ecuador,
              obj.Egypt,
              obj.El_Salvador,
              obj.Equatorial_Guinea,
              obj.Eritrea,
              obj.Estonia,
              obj.Ethiopia,
              obj.Faeroe_Islands,
              obj.Micronesia,
              obj.Fiji,
              obj.Finland,
              obj.France,
              obj.French_Guiana,
              obj.French_Polynesia,
              obj.Gabon,
              obj.Gambia,
              obj.Georgia,
              obj.Germany,
              obj.Ghana,
              obj.Greece,
              obj.Greenland,
              obj.Grenada,
              obj.Guadeloupe,
              obj.Guatemala,
              obj.Guinea,
              obj.Guinea_Bissau,
              obj.Guyana,
              obj.Haiti,
              obj.Honduras,
              obj.Hong_Kong,
              obj.Hungary,
              obj.Iceland,
              obj.India,
              obj.Indonesia,
              obj.Iraq,
              obj.Ireland,
              obj.Iran,
              obj.Israel,
              obj.Italy,
              obj.Jamaica,
              obj.Japan,
              obj.Jordan,
              obj.Kazakhstan,
              obj.Kenya,
              obj.Kiribati,
              obj.Kosovo,
              obj.Kuwait,
              obj.Kyrgyzstan,
              obj.Laos,
              obj.Latvia,
              obj.Lebanon,
              obj.Lesotho,
              obj.Liberia,
              obj.Libya,
              obj.Liechtenstein,
              obj.Lithuania,
              obj.Luxembourg,
              obj.Macao,
              obj.North_Macedonia,
              obj.Madagascar,
              obj.Malawi,
              obj.Malaysia,
              obj.Maldives,
              obj.Mali,
              obj.Malta,
              obj.Marshall_Islands,
              obj.Martinique,
              obj.Mauritania,
              obj.Mauritius,
              obj.Mayotte,
              obj.Mexico,
              obj.Mongolia,
              obj.Montenegro,
              obj.Montserrat,
              obj.Morocco,
              obj.Mozambique,
              obj.Myanmar,
              obj.Namibia,
              obj.Nauru,
              obj.Nepal,
              obj.Netherlands,
              obj.New_Caledonia,
              obj.New_Zealand,
              obj.Nicaragua,
              obj.Niger,
              obj.Nigeria,
              obj.Niue,
              obj.Norway,
              obj.Occupied_Palestinian_Territory,
              obj.Oman,
              obj.Pakistan,
              obj.Palau,
              obj.Panama,
              obj.Papua_New_Guinea,
              obj.Paraguay,
              obj.Peru,
              obj.Philippines,
              obj.Bolivia,
              obj.Poland,
              obj.Portugal,
              obj.Qatar,
              obj.Cameroon,
              obj.South_Korea,
              obj.Moldova,
              obj.South_Sudan,
              obj.Sudan,
              obj.Réunion,
              obj.Romania,
              obj.Russian_Federation,
              obj.Rwanda,
              obj.Saint_Helena,
              obj.Saint_Lucia,
              obj.Sint_Maarten,
              obj.Samoa,
              obj.Sao_Tome_and_Principe,
              obj.Saudi_Arabia,
              obj.Senegal,
              obj.Serbia,
              obj.Seychelles,
              obj.Sierra_Leone,
              obj.Singapore,
              obj.Slovakia,
              obj.Slovenia,
              obj.Solomon_Islands,
              obj.Somalia,
              obj.South_Africa,
              obj.Spain,
              obj.Sri_Lanka,
              obj.Saint_Kitts_and_Nevis,
              obj.Saint_Pierre_and_Miquelon,
              obj.Saint_Vincent_and_the_Grenadines,
              obj.Suriname,
              obj.Swaziland,
              obj.Sweden,
              obj.Switzerland,
              obj.Syria,
              obj.Taiwan,
              obj.Tajikistan,
              obj.Thailand,
              obj.Timor_Leste,
              obj.Togo,
              obj.Tonga,
              obj.Trinidad_and_Tobago,
              obj.Tunisia,
              obj.Turkey,
              obj.Turkmenistan,
              obj.Turks_and_Caicos_Islands,
              obj.Tuvalu,
              obj.Uganda,
              obj.Ukraine,
              obj.United_Arab_Emirates,
              obj.United_Kingdom,
              obj.Tanzania,
              obj.USA,
              obj.Uruguay,
              obj.Uzbekistan,
              obj.Vanuatu,
              obj.Venezuela,
              obj.Vietnam,
              obj.Wallis_and_Futuna_Islands,
              obj.Yemen,
              obj.Zambia,
              obj.Zimbabwe,
              
             ];
             newObj.chartNumber = "v8";

             newArray.push(newObj);
         });

         await V8.insertMany(newArray);
    

        
       }) 
    
   
  });

//Upload V9 data

/*app.post("/", upload.single("file"), async (req, res, next) => {
    csv()
   .fromFile(req.file.path)
     .then(async (jsonObj) => {
        
        let newArray = [];

        jsonObj.forEach((obj) => {
          

            newArray.push(newObj);
        });

        await V9.insertMany(newArray);
    

        
      }) 
    
   
 });*/





// Port set up
app.listen(PORT, function () {
    console.log(`Server is listened!`.cyan.underline.bold);  
});



