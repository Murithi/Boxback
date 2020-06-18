const DeliveryDepoQuery = {
	getAllDeliveryDepoFeed: async (_, args, { models }) =>
		models.DeliveryDepo.findAll(),
}

module.exports = { DeliveryDepoQuery }
