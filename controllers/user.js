const User = require('../models/user');
const Order = require('../models/order');

//These are custom middleware which will not be called directly as controllers
exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((error, user) => {
		if (error || !user) {
			return res.status(400).json({
				error: 'No User was found',
			});
		}
		req.profile = user;
		next();
	});
};

//actual controller methods
//from user route
exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
	User.find().exec((error, users) => {
		if (error || !users) {
			return res.status(400).json({
				error: 'No users were found',
			});
		}
		return res.json(users);
	});
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{
			new: true,
			useFindAndModify: false,
		},
		(error, user) => {
			if (error) {
				return res.status(400).json({
					error: 'You are not authorized to update user',
				});
			}
			(user.salt = undefined), (user.encry_password = undefined);
			res.status(200).json(user);
		}
	);
};

exports.userPurchaseList = (req, res) => {
	Order.find({ user: req.profile._id })
		.Populate('user', '_id name')
		.exec((error, order) => {
			if (error) {
				return res.status(400).json({
					error: 'No order in this account',
				});
			}
			return res.status(200).json(order);
		});
};

//from order route
exports.pushOrderInPurchaseList = (req, res, next) => {
	console.log(
		'Reached in User purchase list - Request body : ' + JSON.stringify(req.body)
	);
	let purchases = [];
	req.body.order.products.forEach((product) => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id,
		});
	});

	//store in DB
	User.findOneAndUpdate(
		{
			_id: req.profile._id,
		},
		{ $push: { purchases: purchases } },
		{ new: true },
		(error, purchases) => {
			if (error) {
				return res.status(400).json({
					error: 'unable to save purchase list',
				});
			}
		}
	);
	next();
};
