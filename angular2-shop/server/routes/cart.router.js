import Cart from '../models/cart.model';
export default (app, router) => {
  var Table = Cart;
  router.route('/cart')
    .post((req, res) => {
        console.log("In Cart API");

        var data = req.body;
        console.log("Pr data",data);

        Table.create(data, (err, newRow) => {
			if (err)
				res.send(err);
			else
				res.json(newRow);
      });
    })
};
