<script>
	import Review from '../components/Review.svelte';
	import Build from '../components/Build.svelte';

</script>


<div id="target">
	<Build>
		<Review/>
	</Build>
</div>

<style>

#target {
	background-color: var(--toad-color);
}

</style>