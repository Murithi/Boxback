import bcrypt from 'bcrypt'
import _ from 'lodash'
import { tryLogin } from '../../auth'
const { getUserId } = require('../../utils/getUser')
var nodemailer = require('nodemailer')

const formatErrors = (e, models) => {
	if (e instanceof models.sequelize.ValidationError) {
		//  _.pick({a: 1, b: 2}, 'a') => {a: 1}
		return e.errors.map(x => _.pick(x, ['path', 'message']))
	}
	return [{ path: 'name', message: 'something went wrong' }]
}

const User = {
	login: async (_, args, { models, SECRET }, info) => {
		const { password, email } = args
		console.log('Password: ', password)
		return tryLogin(email, password, models, SECRET)
	},

	signup: async (_, args, { models }, info) => {
		try {
			const { firstName, lastName, userRole, email, password } = args
			// let password = Math.random()
			// 	.toString(36)
			// 	.replace(/[^a-z]+/g, '')
			// 	.substr(0, 6)

			const hashedPassword = await bcrypt.hash(password, 12)

			const user = await models.User.create({
				firstName,
				lastName,
				userRole,
				email,
				password: hashedPassword,
				confirmed: false,
				authorized: true,
			})

			return {
				ok: true,
				errors: formatErrors(err, models),
			}
		} catch (err) {
			return {
				ok: true,
			}
		}
	},

	changePassword: async (_, args, ctx, info) => {
		try {
			let { password, userId } = args
			if (password.length < 5 || password.length > 100) {
				return {
					ok: false,
					errors: [
						{
							path: 'password',
							message:
								'The password needs to be between 5 and 100 characters long',
						},
					],
				}
			}

			const hashedPassword = await bcrypt.hash(password, 12)
			const check = await bcrypt.compare(password, hashedPassword)
			console.log('USERID::::::::::', userId)
			if (!userId) {
				userId = getUserId(ctx)

				const user = await ctx.models.User.findOne({
					where: { id: userId },
				})

				user.update({
					password: hashedPassword,
					locked: true,
					confirmed: false,
				})
				return {
					ok: true,
				}
			} else {
				const thisUser = getUserId(ctx)

				const user = await ctx.models.User.findOne({
					where: { id: userId },
				})
				if (thisUser !== userId) {
					user.update({
						password: hashedPassword,
						locked: true,
						confirmed: false,
					})
				} else {
					user.update({
						password: hashedPassword,
						locked: false,
						confirmed: true,
					})
				}

				return {
					ok: true,
				}
			}
		} catch (err) {
			console.log(err)
			return {
				ok: false,
				errors: formatErrors(err, ctx.models),
			}
		}
	},
	editUser: async (_, { id, ...otherArgs }, { models }) => {
		try {
			let person = await models.User.findOne({ where: { id: id } })

			person.update({ ...otherArgs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { User }
