const Prestack = {
	addPrestack: async (_, args, { models }) => {
		try {
			return await models.PrestackCompany.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	editPrestack: async (_, { id, ...otherArgs }, { models }) => {
		try {
			let prestack = await models.PrestackCompany.findOne({ where: id })
			prestack.update({ ...otherargs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removePrestack: async (_, { id }, { models }) => {
		try {
			let prestack = await models.PrestackCompany.findOne({ where: id })
			prestack.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}
module.exports = { Prestack }
