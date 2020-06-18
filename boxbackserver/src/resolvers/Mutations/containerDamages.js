import sequelize from 'sequelize'
const { getUserId } = require('../../utils/getUser')
const ContainerDamages = {
	addContainerDamages: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)

			console.log(args)
			return await ctx.models.ContainerDamages.findOrCreate({
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
	editContainerDamages: async (_, { id, ...otherArgs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let damages = await ctx.models.ContainerDamages.findOne({ where: { id } })
			damages.update({ ...otherArgs, addedby_id: userId })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { ContainerDamages }
