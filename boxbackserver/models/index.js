import Sequelize from 'sequelize'
import Version from 'sequelize-version'
// Live credentials
// const sequelize = new Sequelize('boxbacktest', 'ycftsuser', 'boxBack2019!', {
// 	define: {
// 		underscored: true,
// 	},
// 	dialect: 'postgres',
// })
//Test credentials
const sequelize = new Sequelize('boxback', 'postgres', 'postgres', {
	define: {
		underscored: true,
	},
	dialect: 'postgres',
})
//Live credentials
// const sequelize = new Sequelize('boxback', 'postgres', 'postgres', {
// 	define: {
// 		underscored: true,
// 	},
// 	dialect: 'postgres',
// 	logging: false,
// })

const models = {
	User: sequelize.import('./user'),
	Trucker: sequelize.import('./trucker'),
	Container: sequelize.import('./container'),
	DeliveryDepo: sequelize.import('./depoDelivery'),
	PrestackCompany: sequelize.import('./prestackCompany'),
	PreadviseTransaction: sequelize.import('./preadviseTransaction'),
	PreadvisedTransaction: sequelize.import('./preadvisedTransaction'),
	PreadviseTransactionCancelled: sequelize.import(
		'./preadviseTransactionCancelled',
	),
	Damages: sequelize.import('./damages'),
	ContainerDamages: sequelize.import('./containerDamages'),
	Client: sequelize.import('./client'),
	Operator: sequelize.import('./operator'),
}
Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models)
	}
})

models.sequelize = sequelize

models.Sequelize = Sequelize

export default models
