import axios from 'axios'
const { getUserId } = require('../../utils/getUser')

const PreadviseTransaction = {
	createPreadvise: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)

			const { containerNum } = args
			let result

			const existingPread = await ctx.models.PreadviseTransaction.findOne({
				where: {
					containerNum,
					deliveryNoteID: null,
				},
			})
			if (existingPread) {
				result = { ok: false, message: 'Container already in transit' }
			} else {
				return await ctx.models.PreadviseTransaction.findOrCreate({
					where: {
						...args,
						deliveryNoteID: null,
						addedby_id: userId,
						lastupdatedby_id: userId,
					},
				})
				result = { ok: true, message: 'Success' }
			}

			return result
		} catch (error) {
			console.log(error)
			return false
		}
	},
	editPreadvise: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			const { id, outDateICD } = args
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})

			if (outDateICD) {
				pread.update({
					id,
					loadingTime: outDateICD,
				})
			} else {
				pread.update({
					...args,
					lastupdatedby_id: userId,
				})
			}

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	updatePreadvise: async (_, { id, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			pread.update({
				...otherargs,
				arrivalStatus: false,
				extradetailsby_id: userId,
				lastupdatedby_id: userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	arrivalNrb: async (_, { id, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			console.log('Logging Naiorobi')
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			let { bblEIR } = otherargs
			if (!bblEIR) bblEIR = Math.floor(10000000 + Math.random() * 90000000)
			pread.update({
				...otherargs,
				bblEIR: bblEIR,
				recievedicdby_id: userId,
				lastupdatedby_id: userId,
			})
			const {
				inDateICD,
				inTimeICD,
				deliveryDriverName,
				deliveryDriverID,
				modeOfTransportId,
			} = otherargs
			let dataToSend = {}
			dataToSend.pOL = pread.pOL
			dataToSend.inDateICD = inDateICD
			dataToSend.inTimeICD = inTimeICD
			dataToSend.bblEIR = bblEIR
			dataToSend.deliveryDriverName = deliveryDriverName
			dataToSend.deliveryDriverID = deliveryDriverID
			dataToSend.modeOfTransportId = modeOfTransportId
			dataToSend.containerNum = pread.containerNum
			dataToSend.fileBillingNumber = pread.fileBillingNumber
			dataToSend.clientCode = pread.clientCode
			dataToSend.vessel = pread.vessel
			dataToSend.pOD = pread.pOD
			dataToSend.partyDeliveringName = pread.partyDeliveringName

			const containerDetails = await ctx.models.Container.findOne({
				where: {
					id: pread.containerSize,
				},
			})
			const clientDetails = await ctx.models.Client.findOne({
				where: {
					clientName: pread.clientCode,
				},
			})
			const user = await ctx.models.User.findOne({
				where: { id: userId },
			})

			let containerDamages = await ctx.models.sequelize.query(
				`SELECT "DamageCode", "repairCode", "description", "manhours", "materialCost" FROM public."containerDamages" AS B INNER JOIN public."damages" as C on B."DamageCode"::text = C."id"::text where "containerNum"='${pread.containerNum}'`,
				{
					model: ctx.models.ContainerDamages,
					raw: true,
				},
			)
			// console.log('Client', clientDetails)

			dataToSend.containerDamages = containerDamages
			dataToSend.name = user.firstName + ' ' + user.lastName
			dataToSend.containerSize = containerDetails.containerCode
			dataToSend.clientEmail = clientDetails.clientEmailAddress

			let data = JSON.stringify(dataToSend)

			const headers = {
				'Content-Type': 'application/json',
			}
			axios
				.post('http://localhost:5000/send-email', data, {
					headers: headers,
				})
				.then()
				.then((res) => {})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	departureNrb: async (_, { id, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			pread.update({
				...otherargs,
				exiticdby_id: userId,
				lastupdatedby_id: userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	arrivalMsa: async (_, { id, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			pread.update({
				...otherargs,
				recievedmsaby_id: userId,
				arrivalStatus: true,
				lastupdatedby_id: userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	deliveryContainer: async (_, { id, deliveryNoteID, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			pread.update({
				...otherargs,
				exitmsaby_id: userId,
				lastupdatedby_id: userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	updateGuarantee: async (_, { id, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			pread.update({
				...otherargs,
				guaranteeby_id: userId,
				lastupdatedby_id: userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	updateAdminMombasa: async (_, { id, eirNum, eirDate, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			pread.update({
				...otherargs,
				dateDelivered: eirDate,
				deliveryNoteID: eirNum,
				deliverynotemsaby_id: userId,
				lastupdatedby_id: userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	updateInvoice: async (_, { id, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			const { eirNum } = otherargs
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			pread.update({
				...otherargs,
				deliveryNoteID: eirNum,
				invoicedby_id: userId,
				lastupdatedby_id: userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removePreadvise: async (_, { id }, ctx) => {
		try {
			let pread = await ctx.models.PreadviseTransaction.findOne({
				where: { id },
			})
			console.log(pread)
			await ctx.models.PreadviseTransactionCancelled.create({
				...pread.dataValues,
			})
			pread.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { PreadviseTransaction }
