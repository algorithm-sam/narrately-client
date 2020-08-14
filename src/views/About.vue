<template>
	<Layout :unwrap="true">
		<section class="hero is-medium is-success is-bold hero-first">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Wavenet
					</h1>
					<h2 class="subtitle">
						About page...
					</h2>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<h1 class="title">Section</h1>
				<h2 class="subtitle">
					A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
				</h2>
			</div>
		</section>
	</Layout>
</template>

<script>

import Layout from '../components/layout/index.vue';

export default {
	name: 'about',
	components: {
		Layout
	}
}
</script>
