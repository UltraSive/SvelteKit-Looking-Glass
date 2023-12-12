<script>
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	const PoPs = data.PoPs;
	const selected = $page.url.searchParams.get('pop');

	let loading = false;
</script>

<title>Looking Glass</title>

<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
	<div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
		<div class="px-4 sm:px-0">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Looking Glass</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				This is a tool will give you and overview of our network from the inside.
			</p>
		</div>

		<form
			method="POST"
			class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 shadow-md"
		>
			<div class="px-4 py-6 sm:p-8">
				<div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-3">
						<label for="country" class="block text-sm font-medium leading-6 text-gray-900"
							>Type</label
						>
						<div class="mt-2">
							<select
								id="type"
								name="type"
								class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
							>
								<option>ping</option>
								<option>mtr</option>
							</select>
						</div>
					</div>

					<div class="sm:col-span-3">
						<label for="country" class="block text-sm font-medium leading-6 text-gray-900"
							>Point of Presence</label
						>
						<div class="mt-2">
							<select
								id="pop"
								name="pop"
								class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
							>
								{#each data.PoPs as pop}
									{#if selected === pop.id}
										<option selected value={pop.id}>{pop.name}</option>
									{:else}
										<option value={pop.id}>{pop.name}</option>
									{/if}
								{/each}
							</select>
						</div>
					</div>

					<div class="sm:col-span-4">
						<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
							>Query Address</label
						>
						<div class="mt-2">
							<input
								id="host"
								name="host"
								type="text"
								placeholder="0.0.0.0/0 or Google.com"
								class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
			>
				<button
					type="submit"
					class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
					on:click={() => (loading = true)}>Query</button
				>
			</div>
		</form>
	</div>

	<!-- Output -->
	<div class="mt-4">
		<label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
			>Response</label
		>
		<div
			class="mt-2 flex justify-left rounded-lg border border-dashed bg-gray-50 border-gray-900/25 px-6 py-10 whitespace-pre-wrap"
		>
			{#if form?.result}
				{form.result.output}
			{:else if loading}
				<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid" />
			{:else}
				Waiting...
			{/if}
		</div>
	</div>
</div>
