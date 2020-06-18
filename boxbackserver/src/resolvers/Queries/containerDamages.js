const ContainerDamagesQuery = {
	getAllContainerDamages: async (_, args, { models }) =>
		models.ContainerDamages.findAll(),
	getContainerDamages: async (_, { id }, { models }) =>
		await models.ContainerDamages.findOne({ where: { id } }),
}

module.exports = { ContainerDamagesQuery }
