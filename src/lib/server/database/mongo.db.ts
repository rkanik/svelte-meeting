import mongoose from 'mongoose';

let isLoading = false;
const connect = async () => {
	if (isLoading || mongoose.connection.readyState) return;

	try {
		isLoading = true;
		await mongoose.connect('mongodb://127.0.0.1:27017', {
			dbName: 'qelos-calendly'
		});
		isLoading = false;

		return [false, null];

		//
	} catch (error: any) {
		console.log('mongodb::error', error, error.message);

		isLoading = false;
		return [true, error];
	}
};

export default { connect };
