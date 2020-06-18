export default (sequelize, DataTypes) => {
	const PreadvisedTransaction = sequelize.define('preadvisedTransaction', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		clientCode: {
			type: DataTypes.STRING,
		},
		fileBillingNumber: {
			type: DataTypes.STRING,
		},
		preAdviseNum: {
			type: DataTypes.STRING,
		},
		containerNum: {
			type: DataTypes.STRING,
		},
		containerSize: {
			type: DataTypes.STRING,
		},
		containerSizeType: {
			type: DataTypes.STRING,
		},
		operatorCode: {
			type: DataTypes.STRING,
		},
		weight: {
			type: DataTypes.STRING,
		},
		eQStatus: {
			type: DataTypes.STRING,
		},
		fEStatus: {
			type: DataTypes.STRING,
		},
		pOL: {
			type: DataTypes.STRING,
		},
		pOD: {
			type: DataTypes.STRING,
		},
		inDateICD: {
			type: DataTypes.DATE,
		},
		inTimeICD: {
			type: DataTypes.DATE,
		},
		modeOfTransport: {
			type: DataTypes.STRING,
		},
		transportType: {
			type: DataTypes.STRING,
		},
		carrierID: {
			type: DataTypes.STRING,
		},
		modeOfTransportId: {
			type: DataTypes.STRING,
		},
		bblEIR: {
			type: DataTypes.STRING,
		},
		deliveryDriverName: {
			type: DataTypes.STRING,
		},
		deliveryDriverID: {
			type: DataTypes.STRING,
		},
		partyDeliveringName: {
			type: DataTypes.STRING,
		},
		transporterName: {
			type: DataTypes.STRING,
		},
		etdNBO: {
			type: DataTypes.DATE,
		},
		loadingTime: {
			type: DataTypes.DATE,
		},
		outTimeICD: {
			type: DataTypes.DATE,
		},
		modeOfTransportOut: {
			type: DataTypes.STRING,
		},
		transportTypeOut: {
			type: DataTypes.STRING,
		},
		carrierIDOut: {
			type: DataTypes.STRING,
		},
		modeOfTransportIdOut: {
			type: DataTypes.STRING,
		},
		etaMSA: {
			type: DataTypes.DATE,
		},
		wagonNum: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.STRING,
		},
		arrivalDateMSA: {
			type: DataTypes.DATE,
		},
		inTimeMsa: {
			type: DataTypes.DATE,
		},
		modeOfTransportMsa: {
			type: DataTypes.STRING,
		},
		transportTypeMsa: {
			type: DataTypes.STRING,
		},
		carrierIDMsa: {
			type: DataTypes.STRING,
		},
		modeOfTransportIdMsa: {
			type: DataTypes.STRING,
		},
		arrivalStatus: {
			type: DataTypes.BOOLEAN,
		},
		guaranteeForm: {
			type: DataTypes.DATE,
		},
		guaranteeFormValidity: {
			type: DataTypes.STRING,
		},
		destination: {
			type: DataTypes.STRING,
		},
		dateDelivered: {
			type: DataTypes.DATE,
		},
		outTimeMsa: {
			type: DataTypes.DATE,
		},
		modeOfTransportOutMsa: {
			type: DataTypes.STRING,
		},
		transportTypeOutMsa: {
			type: DataTypes.STRING,
		},
		carrierIDOutMsa: {
			type: DataTypes.STRING,
		},
		modeOfTransportOutMsa: {
			type: DataTypes.STRING,
		},
		tractor: {
			type: DataTypes.STRING,
		},
		deliveryNoteID: {
			type: DataTypes.STRING,
		},
		truckerId: {
			type: DataTypes.STRING,
		},
		truckerDriverName: {
			type: DataTypes.STRING,
		},
		truckerDriverID: {
			type: DataTypes.STRING,
		},
		eirNum: {
			type: DataTypes.STRING,
		},
		eirDate: {
			type: DataTypes.STRING,
		},
		invoiceNum: {
			type: DataTypes.STRING,
		},
		vessel: {
			type: DataTypes.STRING,
		},
		sOExpiryDate: {
			type: DataTypes.STRING,
		},
		refNum: {
			type: DataTypes.STRING,
		},
		preadviseDate: {
			type: DataTypes.STRING,
		},
		position: {
			type: DataTypes.STRING,
		},
		remarks: {
			type: DataTypes.STRING,
		},
	})
	PreadvisedTransaction.associate = models => {
		PreadvisedTransaction.belongsTo(models.User, { as: 'addedby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'extradetailsby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'recievedicdby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'exiticdby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'recievedmsaby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'exitmsaby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'guaranteeby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'deliverynotemsaby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'invoicedby' }),
			PreadvisedTransaction.belongsTo(models.User, { as: 'lastupdatedby' })
	}
	return PreadvisedTransaction
}
