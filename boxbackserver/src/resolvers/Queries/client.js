const ClientQuery = {
	getAllClients: async (_, args, { models }) => await models.Client.findAll(),
}

module.exports = { ClientQuery }
