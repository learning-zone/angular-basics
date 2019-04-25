// ```
// _product.router.js
// ```

// */app/routes/_product.router.js*

// # Product API object

// HTTP Verb  Route                   Description

// GET        /api/product             Get all of the products
// GET        /api/product/:product_id  Get a single product by product id
// POST       /api/product             Create a single product
// DELETE     /api/product/:product_id  Delete a single product
// PUT        /api/product/:product_id  Update a product with new info

// Load the `product` model
import Product from '../models/product.model';

export default (app, router) => {
    var Table = Product;

    router.route('/shopproducts/:shop_id')

   // ### Create a shop item

   // Accessed at POST http://localhost:8080/api/shop


   // ### Get all of the shop items

   // Accessed at GET http://localhost:8080/api/shop
   .get((req, res) => {
       console.log('shop_id id is-',req.params.shop_id)
       // Use mongoose to get all data items in the database
       Table.find({ 'shopId' : req.params.shop_id},(err, data) => {

           if(err)
		   {
               res.send(err);
		   }
           else
		   {
			   console.log("shop products",data)
               res.json(data);
		   }
       });
   });


    

    router.route('/myproduct/:user_id')

    // ### Create a product item

    // Accessed at POST http://localhost:8080/api/product


    // ### Get all of the product items

    // Accessed at GET http://localhost:8080/api/product
    .get((req, res) => {
        console.log('user id is-',req.params.user_id)
        // Use mongoose to get all product items in the database
        Product.find({ 'userId' : req.params.user_id },(err, product) => {

            if(err)
                res.send(err);

            else
                res.json(product);
        });
    });


  // ## Product API Routes

  // Define routes for the `product` API

  router.route('/product')

    // ### Create a `product`

    // Accessed at POST http://localhost:8080/api/product

    // Create a `product`
    .post((req, res) => {

        console.log(`shop created tt: ${req.body.title}`);
        console.log(`shop created vv: ${req.body.cuisine}`);
        console.log(`shop created userId: ${req.body.userId}`);
        var data = req.body;
        console.log("Pr data",data);
      Product.create(
          data
        
      , (err, product) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Product created: ${product}`);

        // return the new `product` to our front-end
        res.json(product);
      });
    })

    // ### Get all of the `products`

    // Accessed at GET http://localhost:8080/api/product
    .get((req, res) => {

      // Use mongoose to get all products in the database
        Product.find(
            {
                "price" : {
                    $exists : true
                }
            },
            (err, data) => {

                if(err)
                    res.send(err);

                else
                    res.json(data);
            });
    });

  router.route('/product/:product_id')

    // ### Get a `product` by ID

    // Accessed at GET http://localhost:8080/api/product/:product_id
    .get((req, res) => {
		console.log('1.In Get product by id',req.params)
		console.log('2.In Get product by id',req.params.product_id)
		
      // Use mongoose to fetch a single `product` by id in the database
      Table.find({ '_id' : req.params.product_id }, (err, product) => {
		console.log('product',product)
        if(err)
          res.send(err);

        else
          res.json(product[0]);
      });
    })

    // ### Update a `product` by ID

    // Accessed at PUT http://localhost:8080/api/product/:product_id
    .put((req, res) => {

      // use our `product` model to find the `product` we want
      Product.findOne({

        '_id' : req.params.product_id

      }, (err, product) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.title)
          product.title = req.body.title;

        if (req.body.tags)
          product.tags = req.body.tags;

        if (req.body.rating)
          product.rating = req.body.rating;

        if (req.body.amount)
          product.amount = req.body.amount;

        if (req.body.creator)
          product.creator = req.body.creator;

        if (req.body.description)
          product.description = req.body.description;

        if (req.body.ingredients)
          product.ingredients = req.body.ingredients;

        if (req.body.directions)
          product.directions = req.body.directions;

        // save the `product`
        return product.save((err) => {

          if (err)
            res.send(err);

          return res.send(product);

        });
      });
    })

    // ### Delete a `product` by ID

    // Accessed at DELETE http://localhost:8080/api/product/:product_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete product with id: ${req.params.product_id}`);

      Product.remove({

        _id : req.params.product_id
      }, (err, product) => {

        if(err)
          res.send(err);

        else
          console.log('Product successfully deleted!');

        Product.find((err, products) => {
          if(err)
            res.send(err);

          res.json(products);
        });
      });
    });
};
