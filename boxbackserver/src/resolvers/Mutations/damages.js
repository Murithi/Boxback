const { getUserId } = require('../../utils/getUser')

const Damages = {
	addDamage: async (_, args, ctx) => {
		try {
			// const userId = getUserId(ctx)
			const userId = '4687d56a-8c8b-4704-8ae0-4b20175c4505'
			return await ctx.models.Damages.findOrCreate({
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
	editDamage: async (_, { id, ...otherArgs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let damages = await ctx.models.Damages.findOne({ where: { id } })
			damages.update({ ...otherArgs, addedby_id: userId })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Damages }
