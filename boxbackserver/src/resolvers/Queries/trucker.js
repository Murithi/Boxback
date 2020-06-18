const TruckerQuery = {
	getAllTruckers: async (_, args, { models }) => {
		return await models.Trucker.findAll({
			order: [['truckerName', 'DESC']],
		})
	},
}

module.exports = { TruckerQuery }
