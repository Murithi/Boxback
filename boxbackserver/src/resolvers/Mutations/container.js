const Container = {
	addContainer: async (_, args, { models }) => {
		try {
			return await models.Container.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editContainer: async (_, args, { models }) => {
		try {
			const { id } = args
			let container = await models.Container.findOne({ where: { id } })
			container.update({ ...args })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeContainer: async (_, { id }, { models }) => {
		try {
			let container = await models.Container.findOne({ where: id })
			container.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Container }
