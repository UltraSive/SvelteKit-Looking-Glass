import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		PoPs: await prisma.pointOfPresence.findMany({})
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const fetchEvent = async () => {
			console.log('Looking Glass Action Ran');
			const data = await event.request.formData();
			const popId = data.get('pop');
			const type = data.get('type');
			const host = data.get('host');
            const pop = await prisma.pointOfPresence.findUnique({
                where: {
                    id: popId
                }
            });
            console.log(pop.dns);
			const res = await fetch(`${pop.dns}/${type}/${host}`);
			// Its encapsulated in a few data objects.
			console.log(res);
			return res.json();
		};

		return {
			result: await fetchEvent(),
		};
	}
};
