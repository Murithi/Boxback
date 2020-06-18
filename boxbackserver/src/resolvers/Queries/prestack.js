const PrestackQuery = {
	getAllPrestackFeed: async (_, args, { models }) =>
		models.PrestackCompany.findAll(),
}

module.exports = { PrestackQuery }
