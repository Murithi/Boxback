const OperatorQuery = {
	getAllOperators: async (_, args, { models }) =>
		await models.Operator.findAll(),
}

module.exports = { OperatorQuery }
