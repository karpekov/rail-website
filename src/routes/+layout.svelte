<script lang="ts">
	import '../app.postcss';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';

</script>

<div class="app h-full overflow-auto">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
