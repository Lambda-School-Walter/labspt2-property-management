const express = require('express');
const router = express.Router();
const db = require('../data/helper/workOrderModal');

//GET all workorders

router.get('/api/workorders', (req, res) => {
	db.getWorkOrders().then((workorders) =>
		res.status(200).json(workorders).catch((err) => {
			res.status(500).json({ error: `${err}` });
		})
	);
});

//GET work orders by ID

router.get('/api/workorders/:id', (req, res) => {
	const { id } = req.params;
	db
		.findByWorkOrderId(id)
		.then((workorder) => {
			if (workorder) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ error: 'workorder not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

//POST new workorder

router.post('/api/workorders', (req, res, next) => {
	const newWorkorder = req.body;
	db
		.createWorkOrder(newWorkorder)
		.then((ids) => {
			db
				.findByWorkOrderId(ids[0])
				.then((newWorkorder) => {
					res.status(201).json({ newWorkorder: newWorkorder.id });
				})
				.catch((err) => {
					res.status(500).json({ error: `${err}` });
				});
		})
		.catch((err) => {
			next('h500', err);
		});
});

//update(PUT) existing workorder using the id

router.put('/api/workorder/:id', (req, res, next) => {
	const { id } = req.params;
	const edit = req.body;

	db
		.editWorkOrder(id, edit)
		.then((update) => {
			if (update) {
				res.status(200).json({
					message: 'Work order updated'
				});
			} else {
				res.status(404).json({ error: 'That workorder seems to be missing!' });
			}
		})
		.catch((err) => {
			next('h500', err);
		});
});

//DELETE existing work order by using ID

router.delete('/api/workorder/:id', (req, res) => {
	const { id } = req.params;
	db
		.deleteWorkOrder(id)
		.then((workorder) => {
			if (workorder) {
				res.status(202).json({ message: 'Workorder deleted' });
			} else {
				res.status(404).json({ error: 'That Workorder seems to be missing!' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
});

module.exports = router;