// ```
// _shop.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _shop.js may be freely distributed under the MIT license
// ```

// */app/routes/_shop.router.js*

// ## shop API object

// HTTP Verb  Route                 Description

// GET        /api/shop             Get all of the shop items
// GET        /api/shop/:shop_id    Get a single shop item by shop item id
// POST       /api/shop             Create a single shop item
// DELETE     /api/shop/:shop_id    Delete a single shop item
// PUT        /api/shop/:shop_id    Update a shop item with new info

// Load the shop model
import Shop from '../models/shop.model';

export default (app, router) => {

  // ### shop API Routes

  // Define routes for the shop item API


    router.route('/myshop/:user_id')

    // ### Create a shop item

    // Accessed at POST http://localhost:8080/api/shop


    // ### Get all of the shop items

    // Accessed at GET http://localhost:8080/api/shop
    .get((req, res) => {
        console.log('user id is-',req.params.user_id)
        // Use mongoose to get all shop items in the database
        Shop.find({ 'userId' : req.params.user_id },(err, shop) => {

            if(err)
                res.send(err);

            else
                res.json(shop);
        });
    });

  router.route('/shop')

    // ### Create a shop item

    // Accessed at POST http://localhost:8080/api/shop

    // Create a shop item
    .post((req, res) => {
        console.log(`shop created tt: ${req.body.title}`);
        console.log(`shop created vv: ${req.body.cuisine}`);
        console.log(`shop created userId: ${req.body.userId}`);

      Shop.create({
          
          title: req.body.title,
          cuisine: req.body.cuisine,
          userId:req.body.userId,
          isVeg:req.body.isVeg,
          latitude : req.body.latitude ,
          longitude: req.body.longitude,
          url:req.body.url,
          imageUrl:req.body.imageUrl
        

      }, (err, shop) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`shop created: ${shop}`);

        Shop.find((err, shops) => {
          if(err)
            res.send(err);

          res.json(shops);
        });
      });
    })

    // ### Get all of the shop items

    // Accessed at GET http://localhost:8080/api/shop
    .get((req, res) => {

      // Use mongoose to get all shop items in the database
        
        console.log("in shop get");
        // Use mongoose to get all Shop items in the database
        Shop.find(            
            {
                "title" : {
                    $exists : true,
                    $ne : ""
                }
            }
            ,(err, shop) => {

//        Shop.find((err, shop) => 
        
  //      {

                if(err)
                    res.send(err);

                else{
                    console.log(shop);
                    res.json(shop);}
      });
    });

  router.route('/shop/:shop_id')

    // ### Get a shop item by ID

    // Accessed at GET /api/shop/:shop_id
    .get((req, res) => {

      // Use mongoose to a single shop item by id in the database
      //Bug
	  //Shop.findOne(req.params.shop_id, (err, shop) => {
		Shop.findOne({_id:req.params.shop_id}, (err, shop) => {
        if(err)
          res.send(err);

        else
          res.json(shop);
      });
    })

    // ### Update a shop item by ID

    // Accessed at PUT http://localhost:8080/api/shop/:shop_id
    .put((req, res) => {

      // use our shop model to find the shop item we want
      Shop.findOne({

        '_id' : req.params.shop_id

      }, (err, shop) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.text)
          shop.text = req.body.text;
// Only update a field if a new value has been passed in
        if (req.body.amount)
          shop.amount = req.body.amount;

        // save the shop item
        return shop.save((err) => {

          if (err)
            res.send(err);

          return res.send(shop);

        });
      });
    })

    // ### Delete a shop item by ID

    // Accessed at DELETE http://localhost:8080/api/shop/:shop_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete shop with id: ${req.params.shop_id}`);

      Shop.remove({

        _id : req.params.shop_id
      }, (err, shop) => {

        if(err)
          res.send(err);

        console.log('shop successfully deleted!');

        shop.find((err, shops) => {
          if(err)
            res.send(err);

          res.json(shops);
        });
      });
    });
};
