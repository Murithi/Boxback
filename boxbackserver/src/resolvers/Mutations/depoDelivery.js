const DeliveryDepo = {
	addDepoDelivery: async (_, args, { models }) => {
		try {
			return await models.DeliveryDepo.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	editDepoDelivery: async (_, { id, ...otherArgs }, { models }) => {
		try {
			let depo = await models.DeliveryDepo.findOne({ where: id })
			depo.update({ ...otherargs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removeDepoDelivery: async (_, { id }, { models }) => {
		try {
			let depo = await models.DeliveryDepo.findOne({ where: id })
			depo.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}
module.exports = { DeliveryDepo }
