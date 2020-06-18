const ContainerQuery = {
	getAllContainers: async (_, args, { models }) =>
		await models.Container.findAll(),
}

module.exports = { ContainerQuery }
