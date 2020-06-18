import jwt from 'jsonwebtoken'
import _ from 'lodash'
import bcrypt from 'bcrypt'

export const createTokens = async (user, secret, secret2) => {
	const d = new Date()

	const calculatedExpiresIn =
		d.getTime() + 60 * 60 * 1000 - (d.getTime() - d.getMilliseconds()) / 1000

	const createToken = jwt.sign(
		{
			user: _.pick(user, ['id']),
		},
		secret,
		{
			expiresIn: calculatedExpiresIn,
		},
	)

	const createRefreshToken = jwt.sign(
		{
			user: _.pick(user, 'id'),
		},
		secret2,
		{
			expiresIn: '1d',
		},
	)

	return [createToken, createRefreshToken]
}

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
	let userId = -1
	try {
		const {
			user: { id },
		} = jwt.decode(refreshToken)
		userId = id
	} catch (err) {
		return {}
	}

	if (!userId) {
		return {}
	}
	SECRET
	const user = await models.User.findOne({ where: { id: userId }, raw: true })

	if (!user) {
		return {}
	}

	try {
		jwt.verify(refreshToken, user.refreshSecret)
	} catch (err) {
		return {}
	}

	const [newToken, newRefreshToken] = await createTokens(
		user,
		SECRET,
		user.refreshSecret,
	)
	return {
		token: newToken,
		refreshToken: newRefreshToken,
		user,
	}
}

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
	let user
	try {
		user = await models.User.findOne({ where: { email }, raw: true })
	} catch (error) {
		console.log(error)

		// user with provided email not found
		return {
			ok: false,
			errors: [{ path: 'email', message: 'Wrong email' }],
		}
	}

	const valid = await bcrypt.compare(password, user.password)
	console.log('valid', valid)
	if (!valid) {
		// bad password

		return {
			ok: false,
			errors: [{ path: 'password', message: 'Wrong password' }],
		}
	}

	const refreshTokenSecret = user.password + SECRET2

	const [token, refreshToken] = await createTokens(
		user,
		SECRET,
		refreshTokenSecret,
	)

	return {
		ok: true,
		user,
		token,
		refreshToken,
	}
}
