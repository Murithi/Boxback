const Trucker = {
	addTrucker: async (_, args, { models }) => {
		try {
			return await models.Trucker.findOrCreate({
				where: { ...args },
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editTrucker: async (_, { id, ...otherArgs }, { models }) => {
		try {
			let truck = await models.Trucker.findOne({ where: id })
			truck.update({ ...otherArgs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeTrucker: async (_, { id }, { models }) => {
		try {
			let truck = await models.Trucker.findOne({ where: id })
			truck.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Trucker }
