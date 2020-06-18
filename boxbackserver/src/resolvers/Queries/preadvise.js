import _ from 'lodash'

const PreadviseTransactionQuery = {
	getPreadvise: async (_, { id }, { models }) => {
		console.log(id)
		return await models.PreadviseTransaction.findOne({
			where: { id },
		})
	},
	getPreadviseCancelled: async (_, { id }, { models }) => {
		return await models.PreadviseTransactionCancelled.findAll({
			order: [['created_at', 'DESC']],
		})
	},
	getPreadviseByContainer: async (_, { containeNum }, { models }) => {
		return await models.PreadviseTransaction.findOne({
			where: { containerNum },
		})
	},

	getAllPreadvices: async (_, args, { models }) => {
		const { sequelize } = models
		try {
			await models.sequelize.query(`
		insert into public."preadvisedTransactions" select * from public."preadviseTransactions" where "created_at" <= (date_trunc('month', CURRENT_DATE - interval '1' month)); delete from public."preadviseTransactions" where "created_at" <= (date_trunc('month', CURRENT_DATE - interval '1' month)) 
		`)
		} catch (err) {
			// print the error details
			console.log(err)
		}
		return await models.PreadviseTransaction.findAll({
			order: [['created_at', 'DESC']],
		})
	},

	getArrivalContainers: async (_, args, { models }) => {
		return await models.PreadviseTransaction.findAll({
			where: { bblEIR: null },
		})
	},
	getPdfContainers: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			limit: 1300,
			where: {
				bblEIR: { [Op.ne]: null },
			},
			order: [['inDateICD', 'DESC']],
		})
	},
	getDeptMbsContainers: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				bblEIR: { [Op.ne]: null },
				wagonNum: null,
			},
		})
	},
	getArrivalMbsContainers: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				wagonNum: { [Op.ne]: null },
				arrivalStatus: { [Op.or]: [null, false] },
			},
		})
	},
	getDeliveryMsa: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				dateDelivered: null,
				arrivalStatus: true,
			},
		})
	},

	getGuarantee: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				dateDelivered: { [Op.ne]: null },
				guaranteeForm: null,
				// tractor: null,
			},
		})
	},

	getDeliveryNote: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				guaranteeForm: { [Op.ne]: null },
				deliveryNoteID: {
					[Op.or]: [null, ''],
				},
			},
		})
	},
	getInvoice: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				deliveryNoteID: {
					[Op.or]: {
						[Op.not]: null,
						[Op.not]: '',
					},
				},

				invoiceNum: {
					[Op.or]: [null, ''],
				},
			},
		})
	},
	getInvoiced: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				invoiceNum: {
					[Op.and]: {
						[Op.not]: null,
						[Op.not]: '',
					},
				},
			},
		})
	},
	getArchivedReport: async (_, args, { models, Op }) => {
		return await models.PreadvisedTransaction.findAll({
			order: [['created_at', 'DESC']],
		})
	},
	getWorkDetails: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				invoiceNum: null,
			},
		})
	},
	getInvoicedReport: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				invoiceNum: {
					[Op.and]: {
						[Op.not]: null,
						[Op.not]: '',
					},
				},
			},
		})
	},
	getCodecoFields: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				deliveryNoteID: null,
			},
		})
	},
	getReportPreadvices: async (_, args, { models, Op }) => {
		const {
			inDateICD,
			outTimeICD,
			arrivalDateMSA,
			dateDelivered,
			eQStatus,
			fEStatus,
			clientCode,
			operatorCode,
			containerSize,
			vessel,
			position,
		} = args
		let selectArgs = {}
		if (inDateICD !== undefined) selectArgs.inDateICD = inDateICD
		if (outTimeICD !== undefined) selectArgs.outTimeICD = outTimeICD
		if (arrivalDateMSA !== undefined) selectArgs.arrivalDateMSA = arrivalDateMSA
		if (dateDelivered !== undefined) selectArgs.dateDelivered = dateDelivered
		if (eQStatus !== undefined) selectArgs.eQStatus = eQStatus
		if (fEStatus !== undefined) selectArgs.fEStatus = fEStatus
		if (clientCode !== undefined) selectArgs.clientCode = clientCode
		if (operatorCode !== undefined) selectArgs.operatorCode = operatorCode
		if (containerSize !== undefined) selectArgs.containerSize = containerSize
		if (vessel !== undefined) selectArgs.vessel = vessel
		if (position !== undefined) selectArgs.position = position

		const result = await models.PreadviseTransaction.findAll({
			where: { ...selectArgs },
			order: [['created_at', 'DESC']],
		})

		return result
	},
	getToInvoice: async (_, args, { models, Op }) => {
		return await models.PreadviseTransaction.findAll({
			where: {
				invoiceNum: null,
				eirNum: null,
			},
		})
	},
	getDaySummary: async (_, args, { models, Op }) => {
		const { sequelize } = models

		let expected = await models.sequelize.query(
			`SELECT count (*) as expected FROM public."preadviseTransactions" where "inDateICD" is null;`,
			{
				model: models.PreadviseTransaction,
				raw: true,
			},
		)
		let inICD = await models.sequelize.query(
			`SELECT count (*) as inICD FROM public."preadviseTransactions" where "inDateICD" is not null and "loadingTime" is null`,
			{
				model: models.PreadviseTransaction,
				raw: true,
			},
		)
		let onRail = await models.sequelize.query(
			`SELECT count (*) as onRail FROM public."preadviseTransactions" where "loadingTime" is not null and "arrivalDateMSA" is null`,
			{
				model: models.PreadviseTransaction,
				raw: true,
			},
		)
		let inMombasa = await models.sequelize.query(
			`SELECT count (*) as inMombasa FROM public."preadviseTransactions" where "arrivalDateMSA" is not null and "dateDelivered" is null`,
			{
				model: models.PreadviseTransaction,
				raw: true,
			},
		)

		let delivered = await models.sequelize.query(
			`SELECT count (*) as delivered FROM public."preadviseTransactions" where "dateDelivered" is not null and "invoiceNum" is null and "inDateICD" >= date_trunc('month', CURRENT_DATE);`,
			{
				model: models.PreadviseTransaction,
				raw: true,
			},
		)
		let invoiced = await models.sequelize.query(
			`SELECT count (*) as invoiced FROM public."preadviseTransactions" where "dateDelivered" is not null and "invoiceNum" is not null and "inDateICD" >= date_trunc('month', CURRENT_DATE);`,
			{
				model: models.PreadviseTransaction,
				raw: true,
			},
		)
		let allFields = [
			...expected,
			...inICD,
			...onRail,
			...inMombasa,
			...delivered,
			...invoiced,
		]
		// console.log(allFields)
		let daySummary = Object.assign({}, ...allFields)
		// console.log(Object.assign({}, ...allFields))
		return [daySummary]
	},
	getDaysSinceReceipt: async (_, args, { models, Op }) => {
		const { sequelize } = models
		let containerByTime = await models.sequelize.query(
			`select (extract(epoch from coalesce("dateDelivered",current_timestamp)  - "inDateICD")/86400)::integer+1 as daysIn, count("containerNum") as numberOfContainers FROM public."preadviseTransactions" where "dateDelivered" is null and "inDateICD" is not null group by  daysIn order by daysIn desc;`,
			{
				model: models.PreadviseTransaction,
				raw: true,
			},
		)
		return containerByTime
	},
	getMonthlyContainerSummary: async (_, args, { models, Op }) => {
		const { sequelize } = models

		let invoiced = await models.sequelize.query(
			`SELECT count (*) as containers, date_trunc('month', "inDateICD") AS "month" from public."preadviseTransactions" where "dateDelivered" is not null and "invoiceNum" is not null GROUP BY date_trunc('month', "inDateICD") order by date_trunc('month', "inDateICD") ASC;SELECT count (*) as containers, date_trunc('month', "inDateICD") AS "month" from public."preadvisedTransactions" where "dateDelivered" is not null and "invoiceNum" is not null GROUP BY date_trunc('month', "inDateICD") order by date_trunc('month', "inDateICD") ASC;`,
			{
				raw: true,
			},
		)

		const uniqueArray = [...new Set(invoiced[0].map(item => item.month))].map(
			String,
		)

		const unique = uniqueArray.filter((v, i, a) => a.indexOf(v) === i)

		let finalInvoiced = []

		for (let i = 0; i < unique.length; i++) {
			let result = invoiced[0].filter(obj => {
				return obj.month.toString() === unique[i]
			})
			let resultValue

			if (result.length > 1) {
				resultValue = result.reduce((total, value) => {
					return total.concat(parseInt(value.containers))
				}, [])

				const sum = resultValue.reduce((total, amount) => total + amount)

				let newEntry = [{ month: unique[i], containers: sum }]

				finalInvoiced.push(...newEntry)
			} else {
				finalInvoiced.push(...result)
			}
		}

		let delivered = await models.sequelize.query(
			`SELECT count (*) as containers, date_trunc('month', "inDateICD") AS "month" from public."preadviseTransactions" where "dateDelivered" is not null GROUP BY date_trunc('month', "inDateICD") order by date_trunc('month', "inDateICD") ASC;SELECT count (*) as containers, date_trunc('month', "inDateICD") AS "month" from public."preadvisedTransactions" where "dateDelivered" is not null GROUP BY date_trunc('month', "inDateICD") order by date_trunc('month', "inDateICD") ASC;`,
			{
				raw: true,
			},
		)
		const uniqueDelivered = [
			...new Set(delivered[0].map(item => item.month)),
		].map(String)

		const uniquedeliveries = uniqueDelivered.filter(
			(v, i, a) => a.indexOf(v) === i,
		)

		let finaldelivered = []

		for (let i = 0; i < uniquedeliveries.length; i++) {
			let result = delivered[0].filter(obj => {
				return obj.month.toString() === unique[i]
			})
			let resultValue

			if (result.length > 1) {
				resultValue = result.reduce((total, value) => {
					return total.concat(parseInt(value.containers))
				}, [])

				const sum = resultValue.reduce((total, amount) => total + amount)

				let newEntry = [{ month: unique[i], containers: sum }]

				finaldelivered.push(...newEntry)
			} else {
				finaldelivered.push(...result)
			}
		}

		let recieved = await models.sequelize.query(
			`SELECT count (*) as containers, date_trunc('month', "inDateICD") AS "month" from public."preadviseTransactions" where "inDateICD" is not null GROUP BY date_trunc('month', "inDateICD") order by date_trunc('month', "inDateICD") ASC;SELECT count (*) as containers, date_trunc('month', "inDateICD") AS "month" from public."preadvisedTransactions" where "inDateICD" is not null GROUP BY date_trunc('month', "inDateICD") order by date_trunc('month', "inDateICD") ASC;`,
			{
				raw: true,
			},
		)
		const uniqueRecieved = [
			...new Set(recieved[0].map(item => item.month)),
		].map(String)

		const uniqueReciepts = uniqueRecieved.filter(
			(v, i, a) => a.indexOf(v) === i,
		)

		let finalRecieved = []

		for (let i = 0; i < uniqueReciepts.length; i++) {
			let result = recieved[0].filter(obj => {
				return obj.month.toString() === unique[i]
			})
			let resultValue

			if (result.length > 1) {
				resultValue = result.reduce((total, value) => {
					return total.concat(parseInt(value.containers))
				}, [])

				const sum = resultValue.reduce((total, amount) => total + amount)

				let newEntry = [{ month: unique[i], containers: sum }]

				finalRecieved.push(...newEntry)
			} else {
				finalRecieved.push(...result)
			}
		}

		// console.log(' RECIEVED', recieved)

		// let fromrecieved = recieved[0]
		//let fromdelivered = delivered[0]
		// let frominvoiced = invoiced[0]
		let result = [
			{
				recieved: finalRecieved,
				delivered: finaldelivered,
				invoiced: finalInvoiced,
			},
		]
		console.log('Result', result)
		return result
	},
}

module.exports = { PreadviseTransactionQuery }
