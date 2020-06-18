import moment from 'moment'
const { UserQuery } = require('./Queries/user')
const { TruckerQuery } = require('./Queries/trucker')
const { PrestackQuery } = require('./Queries/prestack')
const { DeliveryDepoQuery } = require('./Queries/depoDelivery')
const { ContainerQuery } = require('./Queries/container')
const { PreadviseTransactionQuery } = require('./Queries/preadvise')
const { ClientQuery } = require('./Queries/client')
const { OperatorQuery } = require('./Queries/operator')
const { DamagesQuery } = require('./Queries/damages')
const { ContainerDamagesQuery } = require('./Queries/containerDamages')
const { User } = require('./Mutations/user')
const { Trucker } = require('./Mutations/trucker')
const { Prestack } = require('./Mutations/prestack')
const { DeliveryDepo } = require('./Mutations/depoDelivery')
const { Container } = require('./Mutations/container')
const { PreadviseTransaction } = require('./Mutations/preadvise')
const { Client } = require('./Mutations/client')
const { Operator } = require('./Mutations/operator')
const { Damages } = require('./Mutations/damages')
const { ContainerDamages } = require('./Mutations/containerDamages')
module.exports = {
	Query: {
		...UserQuery,
		...TruckerQuery,
		...PrestackQuery,
		...DeliveryDepoQuery,
		...ContainerQuery,
		...PreadviseTransactionQuery,
		...ClientQuery,
		...OperatorQuery,
		...DamagesQuery,
		...ContainerDamagesQuery,
	},
	Mutation: {
		...User,
		...Trucker,
		...Prestack,
		...DeliveryDepo,
		...Container,
		...PreadviseTransaction,
		...Client,
		...Operator,
		...Damages,
		...ContainerDamages,
	},

	User: {
		id(user) {
			return user.id + ''
		},
		name(user) {
			return user.firstName + ' ' + user.lastName
		},
		role(user) {
			return user.userRole
		},
	},

	ContainerDamages: {
		repair: async (request, _, ctx) => {
			let id = request.DamageCode
			let result = await ctx.models.Damages.findOne({ where: { id } })
			console.log(result)
			return result
		},
	},

	PreadviseTransaction: {
		carrierID: async (request, _, ctx) => {
			let id = request.carrierID
			if (!id) return null
			let result = await ctx.models.Trucker.findOne({ where: { id } })
			return result.truckerCode
		},
		truckerName: async (request, _, ctx) => {
			let id = request.carrierID
			if (!id) return null
			let result = await ctx.models.Trucker.findOne({ where: { id } })
			return result.truckerName
		},
		carrierIDOutMsa: async (request, _, ctx) => {
			let id = request.carrierIDOutMsa
			if (!id) return null
			let result = await ctx.models.Trucker.findOne({ where: { id } })
			return result.truckerCode
		},
		createdAt: async (request, _, ctx) => {
			let createdAt = request.created_at
			if (!createdAt) return null
			return moment(createdAt)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		createdTime: async (request, _, ctx) => {
			let createdAt = request.created_at
			if (!createdAt) return null
			return moment(createdAt)
				.utcOffset('+0300')
				.format('hh:mm:ss')
		},
		preadviseDate: async (request, _, ctx) => {
			let preadviseDate = request.preadviseDate

			if (preadviseDate == null) {
				return null
			} else {
				let thisDate = moment(preadviseDate)
					.utc()
					.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
				// console.log(thisDate)
				return moment(thisDate)
					.utcOffset('+0300')
					.format('YYYY-MM-DD')
			}
		},
		sOExpiryDate: async (request, _, ctx) => {
			let sOExpiryDate = request.sOExpiryDate
			if (!sOExpiryDate) return null
			return moment(sOExpiryDate)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		inDateICD: async (request, _, ctx) => {
			let inDateICD = request.inDateICD
			if (!inDateICD) return null
			return moment(inDateICD)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		outDateICD: async (request, _, ctx) => {
			let loadingTime = request.loadingTime
			if (!loadingTime) return null
			return moment(loadingTime)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		arrivalDateMSA: async (request, _, ctx) => {
			let arrivalDateMSA = request.arrivalDateMSA

			if (!arrivalDateMSA) return null
			return moment(arrivalDateMSA)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		dateDelivered: async (request, _, ctx) => {
			let dateDelivered = request.dateDelivered
			if (!dateDelivered) return null
			return moment(dateDelivered)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		guaranteeForm: async (request, _, ctx) => {
			let guaranteeForm = request.guaranteeForm
			if (!guaranteeForm) return null
			return moment(guaranteeForm)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		guaranteeFormValidity: async (request, _, ctx) => {
			let guaranteeFormValidity = request.guaranteeFormValidity
			if (!guaranteeFormValidity) return null
			return moment(guaranteeFormValidity)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},

		guaranteeForm: async (request, _, ctx) => {
			let guaranteeForm = request.guaranteeForm
			if (!guaranteeForm) return null
			return moment(guaranteeForm)
				.utcOffset('+0300')
				.format('YYYY-MM-DD')
		},
		containerSize: async (request, _, ctx) => {
			let id = request.containerSize

			const Container = await ctx.models.Container.findOne({
				where: {
					id: id,
				},
			})
			// console	console.log(Container)
			return Container.containerCode
		},
		addedby: async (request, _, ctx) => {
			let id = request.addedby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		extradetailsBy: async (request, _, ctx) => {
			// console.log(request)
			let id = request.extradetailsby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		recievedICDBy: async (request, _, ctx) => {
			// console.log(request)
			let id = request.recievedicdby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		exitICDby: async (request, _, ctx) => {
			// console.log(request)
			let id = request.exiticdby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		recievedMSABy: async (request, _, ctx) => {
			// console.log(request)
			let id = request.recievedmsaby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		exitMSABy: async (request, _, ctx) => {
			// console.log(request)
			let id = request.exitmsaby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		guaranteeBy: async (request, _, ctx) => {
			// console.log(request)
			let id = request.guaranteeby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		deliverynotemsaby: async (request, _, ctx) => {
			// console.log(request)
			let id = request.deliverynotemsaby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		invoicedBy: async (request, _, ctx) => {
			// console.log(request)
			let id = request.invoicedby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		lastupdatedby: async (request, _, ctx) => {
			// console.log(request)
			let id = request.lastupdatedby_id
			const User = await ctx.models.User.findOne({
				where: {
					id,
				},
			})
			return User
		},
		clientEmail: async (request, _, ctx) => {
			let clientName = request.clientCode
			console.log('CLientCode: ', clientName)
			const client = await ctx.models.Client.findOne({
				where: { clientName },
			})
			console.log(client.clientEmailAddress)
			return client.clientEmailAddress
		},
		containerDamages: async (request, _, ctx) => {
			let id = request.id
			// console.log(id)
			// let result = []
			// result = request.map(async item => {
			// 	let id = item.DamageCode
			// 	picked = await ctx.models.Damages.findOne({ where: { id } })
			// 	result.push(picked)
			// })
			let damages = await ctx.models.ContainerDamages.findAll({
				where: { preadviseNum: id },
			})

			return damages
		},
	},
}
