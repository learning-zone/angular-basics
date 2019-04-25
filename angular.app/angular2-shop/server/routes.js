import authRoutes from './routes/auth.router.js';
import shopRoutes from './routes/shop.router.js';
import productRoutes from './routes/product.router.js';
import cartRoutes from './routes/cart.router.js';
import orderRoutes from './routes/order.router.js';
import userRoutes from './routes/user.router.js';


export default (app, router, passport) => {

    console.log('router ...'); 
  // ### Express Middlware to use for all requests
  router.use((req, res, next) => {
    console.log('API Call,,,,,'); 
    next();
  });

  // Define a middleware function to be used for all secured routes
  let checkAuthorisedUser = (req, res, next) => {
	console.log('checking auth new');
	console.log('checking auth',req);
	//console.log('checking auth',req.user);
	
	
    if (!req.isAuthenticated())
      res.send(401);
    else
      next();
  };

  let auth = (req, res, next) => {
	console.log('checking auth.11');
	console.log('checking auth',req);
	//console.log('checking auth',req.user);
	
	
    if (!req.isAuthenticated())
      res.send(401);
    else
      next();
  };

  // Define a middleware function to be used for all secured administration
  // routes
  let checkAdmin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin')
      res.send(401);
    else
      next();
  };

  let admin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin')
      res.send(401);
    else
      next();
  };

  // ### Server Routes

  // Handle things like API calls,

  // #### Authentication routes

  // Pass in our Express app and Router.
  // Also pass in auth & admin middleware and Passport instance
  authRoutes(app, router, passport, auth, admin);

  // #### RESTful API Routes

  // Pass in our Express app and Router
    shopRoutes(app, router);

	productRoutes(app, router);
  
  cartRoutes(app, router);
  orderRoutes(app, router);
  userRoutes(app, router);
  
  console.log('Router Changes');
  //productRoutes(app, router);
  
  //shopRoutes(app, router);
  
  
  app.use('/api/secure/*', (req, res,next) => {
	console.log('Use Secure Call-11');
  
    if (!req.isAuthenticated())
      res.send(401);
    else
	{
	  console.log('Auth users',req.user);
      next();
	}

  });
  
 
  app.use('/api/admin/*', (req, res) => {
	console.log('Admin Call');
	//if (!req.isAuthenticated() || req.user.role !== 'admin')
  
    if (!req.isAuthenticated())
      res.send(401);
    else
      next();

  });
  
	// All of our routes will be prefixed with /api
	app.use('/api', router);

  // ### Frontend Routes

  // Route to handle all Angular requests
  app.get('*', (req, res) => {
	
    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    res.sendFile('/dist/index.html', { root: __dirname + "/../"});
  });
  
  
};
