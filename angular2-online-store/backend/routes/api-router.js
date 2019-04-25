'use strict';

module.exports = (app, express) => {
    //Api router
    const apiRouter = express.Router();

    const db = require('../db-utils');

    //Connecting to the database
    db.setUpConnection();


    //Middleware for Logging each request to the console
    apiRouter.use((request, response, next) => {
        console.log(request.method, `/api${request.url}`);
        next();
    });


    //Getting all computers
    apiRouter.get('/computers', (request, response) => {
        db
          .getAllComputers()
          .then(computers => {
              response.json({
                  success: true,
                  message: "The data was successfully retrieved!",
                  data: computers
              });
          })
          .catch(error => {
              response.json({
                  success: false,
                  message: `Couldn't fetch data:  ${error}`,
                  data: []
              });
          });
    });

    apiRouter.post('/computers/filter', (request, response) => {

        const filters = request.body;

        console.log(filters);

        const isComputerPriceInRange = (computer, priceFrom, priceTo) => computer.price >= +priceFrom && computer.price <= +priceTo;
        const isComputerBrandCorrect = (computer, brandsList) => brandsList.indexOf(computer.brand) >= 0;

        db
            .getAllComputers()
            .then(computers => {

                let filteredComputers = computers
                    .filter(computer => isComputerPriceInRange(computer, filters.price.from, filters.price.to))
                    .filter(computer => isComputerBrandCorrect(computer, filters.brands));

                response.json({
                    success: true,
                    message: "The data was successfully filtered!",
                    data: filteredComputers
                });

            })
            .catch(error => {
                response.json({
                    success: false,
                    message: `Couldn't fetch data ${error}`,
                    data: []
                });
            });

    });

    //Creating new computer
    apiRouter.post('/computers', (request, response) => {

        const newComputer = request.body;

        if(newComputer){

            db.createNewComputer(newComputer);

            response.json({
                success: true,
                message: "New computer was successfully created!",
                data: []
            });
        } else {
            response.json({
                success: false,
                message: "Couldn't create a computer!",
                data: []
            });
        }
    });

    //Getting single computer by id
    apiRouter.get('/computers/:id', (request, response) => {

        const id = request.params.id;

        db
          .getComputerById(id)
          .then(computer => {
              response.json({
                  success: true,
                  message: "The data was successfully retrieved",
                  data: [computer]
              });
          })
          .catch(error => {
              response.json({
                  success: false,
                  message: `The data wasn't found! ${error}`,
                  data: []
              });
          });
    });

    //Updating existing computer
    apiRouter.put('/computers/:id', (request, response) => {

        const id = request.params.id;
        const computerToUpdate = request.body;

        db
          .updateExistingComputer(computerToUpdate)
          .then(data => {
              response.json({
                  success: true,
                  message: "Successfully updated!",
                  data: []
              });
          })
          .catch(error => {
              response.json({
                  success: false,
                  message: `Cannot update the computer ${error}`,
                  data: []
              });
          });
    });

    //Deleting existing computer
    apiRouter.delete('/computers/:id', (request, response) => {

        const id = request.params.id;

        db
          .deleteExistingComputer(id)
            .then(data => {
                response.json({
                    success: true,
                    message: "Successfully deleted!",
                    data: []
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: `Cannot delete the computer! ${error}`,
                    data: []
                });
            });
    });


    //Getting all brand names
    apiRouter.get('/brands', (request, response) => {
        db
            .getAllComputers()
            .then(computers => {
                const brandNames = Array.from(new Set(computers.map(computer => computer.brand)));
                response.json({
                    success: true,
                    message: "The data was successfully retrieved!",
                    data: brandNames
                });
            })
            .catch(error => {
                response.json({
                    success: false,
                    message: `Couldn't fetch data! ${error}`,
                    data: []
                });
            });
    });

    return apiRouter;
};

