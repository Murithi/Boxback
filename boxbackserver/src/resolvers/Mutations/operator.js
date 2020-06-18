const { getUserId } = require('../../utils/getUser')
const Operator = {
	addOperator: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)

			return await ctx.models.Operator.findOrCreate({
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
	editOperator: async (_, { id, ...otherArgs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let Operator = await ctx.models.Operator.findOne({ where: { id } })
			Operator.update({ ...otherArgs, addedby_id: userId })
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Operator }
