<script context="module">
  // console.log('module script');
  export async function preload(page, session) {
		const res = await this.fetch('/review.json');
		const reviews = await res.json();

		return { reviews };
  }
</script>


<script>
	export let reviews

</script>

<main>
	
	<div>{Object.entries(reviews)}</div>

</main>

<style>
	

</style>