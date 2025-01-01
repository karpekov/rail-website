<script lang="ts">
	import '../app.postcss';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';

</script>

<div class="app min-h-screen">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
	}
</style>
