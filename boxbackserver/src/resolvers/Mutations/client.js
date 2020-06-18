const { getUserId } = require('../../utils/getUser')
const Client = {
	addClient: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)

			return await ctx.models.Client.findOrCreate({
				where: {
					...args,
					addedby_id: userId,
				},
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	editClient: async (_, { id, ...otherArgs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let client = await ctx.models.Client.findOne({ where: { id } })
			client.update({ ...otherArgs, addedby_id: userId })
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Client }
