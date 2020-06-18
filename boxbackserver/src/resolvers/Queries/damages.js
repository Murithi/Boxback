const DamagesQuery = {
	getAllDamages: async (_, args, { models }) => await models.Damages.findAll(),
	getDamage: async (_, { id }, { models }) =>
		await models.Damages.findOne({ where: { id } }),
}

module.exports = { DamagesQuery }
