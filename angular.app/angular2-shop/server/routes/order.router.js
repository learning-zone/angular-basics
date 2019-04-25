import Order from '../models/order.model';
import OrderItems from '../models/order_items.model';

export default (app, router) => {
  var Table = Order;
  var DetailsTable = OrderItems;
  
  router.route('/order')
    .post((req, res) => {
		var head = req.body;
        var data = req.body.items;
		console.log('order-',data)
		
		var noRows=data.length;
		console.log('order-',noRows);
		
		var lastShopId='';
		var lastOrderId='';
		var orderId='';
		var orders=[];
		var currentOrder;
		
		//for (var i)
		console.log("Pr data",data);
        var lastRecord={};
		for (var index = 0; index < data.length; index++) {
			var line = data[index];
			console.log(data[index]);
			console.log("Pr Line",line);
			if (line.shopId!=lastShopId){	
				lastShopId=line.shopId;
					
				var headerRow={
					orderId:0,
					userId:head.userId,
					shopId:line.shopId,
					email:head.email,
					sellerId:line.sellerId,
					items:[]
				};
				currentOrder=headerRow;
				console.log("befor",orders)
				orders.push(currentOrder);
				console.log("after",orders)
				
				/*
				Table.create(headerRow, (err, newRow) => {
					if (err){
						res.send(err);
					}else{
						lastRecord=newRow;
						orderId=newRow._id;
						currentOrder=newRow;
						currentOrder.items=[];
						
						//res.json(newRow);
					}
				});*/
			} // end if
			console.log("after2",orders)
				
			var detailRow={
				orderId:"pending",
				lineNo:1,
				shopId:line.shopId,
				productId:line.productId,
				productTitle:line.title,
				shopTitle:line.shopTitle,
				option1:line.option1,
				option2:line.option2,
				instructions:line.instructions,
				quantity:line.quantity,
				rate:line.rate,
				amount:line.amount,
				shopId:line.shopId,
				userId:head.userId
				
			};
			console.log("after-item",detailRow);
			currentOrder.items.push(detailRow);
			console.log("after3",orders);
			
			/*
			DetailsTable.create(detailRow, (err, newRow) => {
					lastShopId=line.shopId;
					if (err){
						res.send(err);
					}else{
						lastRecord=newRow;
						orderId=newRow._id;
						currentOrder.items.push(newRow);
					}
			});*/
			console.log("Final",orders)
			

        	
		}//for loop
		console.log("START SAVING",orders);
			
		for (var index = 0; index < orders.length; index++) {
			var o = orders[index];
			Table.create(o, (err, newOrder) => {
				console.log("order create",newOrder);
			});
		}
		res.json(orders)
    })
};
