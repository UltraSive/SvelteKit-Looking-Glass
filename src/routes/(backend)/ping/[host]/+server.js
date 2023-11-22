import { error, fail, redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { exec } from 'node:child_process';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET(event) {
	const ping = async () => {
		return new Promise((resolve, reject) => {
			const childProcess = exec(`ping -c 1 ${event.params.host}`, (error, stdout, stderr) => {
				if (error) {
					reject(error);
				} else {
					resolve(stdout);
				}
			});

			// listen for error below
		});
	};

	try {
		const output = await ping();
		console.log(output);
		return json({ result: 'success', output });
	} catch (err) {
		console.error(err);
		throw error(500, 'Internal Server Error');
	}
}
