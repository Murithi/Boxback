import express from 'express'
import bodyParser from 'body-parser'
import { GraphQLServer } from 'graphql-yoga'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import models from '../models'
import Sequelize from 'sequelize'
import * as path from 'path'
import { print } from 'graphql'
import * as jwt from 'jsonwebtoken'
const SECRET =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjhkOWQ0NDZkLWRlNDgtNGI3ZC1iNTg5LWUxZDBjMzAwZjMwMCIsImlhdCI6MTUzMTIwNzExNiwiZXhwIjoxNTMxMjEwNzE2fQ.3RUAawLX4SHrumui4tNhjr73WeUEeLj_6ZIgmT1Nqxw'
const SECRET2 =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjhkOWQ0NDZkLWRlNDgtNGI3ZC1iNTg5LWUxZDBjMzAwZjMwMCIsImlhdCI6MTUzMTIwNzExNiwiZXhwIjoxNTMxMjEwNzE2fQ.3RUAoiaujkfmeEde4tNhjr73WeUEeLj_6ZIgmT1Nqxw'

import resolvers from './resolvers'
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))

const serverOptions = {
	port: 4000,
}

//{force:true}
models.sequelize.sync().then(req => {
	const Op = Sequelize.Op
	// console.log(req)
	const server = new GraphQLServer({
		typeDefs,
		resolvers,

		context: req => {
			// console.log(req.request.params)
			return {
				...req,
				Op,
				models,
				SECRET,
				SECRET2,
			}
		},
	})

	// server.express.use((req, res, next) => {
	// 	console.log(req)
	// 	// console.log(req.body)
	// 	// console.log(req.ip)
	// 	// console.log(req)
	// 	const { authorization } = req.headers

	// 	// jwt.verify(authorization, SECRET, (err, decodedToken) => {
	// 	// 	if (err || !decodedToken) {
	// 	// 		res.status(401).send('not authorized')
	// 	// 		return
	// 	// 	} else {
	// 	// 		console.log(user)
	// 	// 	}
	// 	// 	next()
	// 	// })
	// 	next()
	// })
	server.start(serverOptions, ({ port }) =>
		console.log(`Server on port ${port}`),
	)
})
