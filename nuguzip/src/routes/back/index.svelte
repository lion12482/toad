<script>


	let data = {
		"name": "",
		"address": "",
		"title": "",
		"description": "",
		"term": "",
		"cost": {
			"insure": null ,
			"rent": null ,
			"manage": null
		},
		"score" : {
			"total": 0,
			"owner": 0,
			"clean": 0,
			"access": 0,
			"bugs": 0,
			"noise": 0
		}
	};




	function d(i) {
		if (i > 10) { 
			return 10
		}
		else {
			return i 
		}
	};

	function click() {
		console.log(Object.entries(data));	
	};


	function onSubmit() {

	};


	$: data.score.total = d(data.score.total);
	$: data.score.owner = d(data.score.owner);
	$: data.score.clean = d(data.score.clean);
	$: data.score.access = d(data.score.access);
	$: data.score.bugs = d(data.score.bugs);
	$: data.score.noise = d(data.score.noise);


</script>

<div>
	<input type="text" name="" bind:value={data.title} placeholder="title">
	<br>
	<input type="text" name="" bind:value={data.address}>
	<input type="text" name="" bind:value={data.name}>
</div>
	<input type="text" name="" bind:value={data.term}>

<br>

<div>
	<input type="number" name="" bind:value={data.cost.insure} placeholder="insure">
	<br>
	<input type="number" name="" bind:value={data.cost.rent}>
	<input type="number" name="" bind:value={data.cost.manage}>
</div>

<br>
<label>
	<input type="text" class="box_score" bind:value={data.score.total} >
	<input type=range class="range_score" bind:value={data.score.total} min=0 max=10>
</label>
<br>
<label>
	<input type="text" class="box_score" bind:value={data.score.owner} >
	<input type=range class="range_score" bind:value={data.score.owner} min=0 max=10>
</label>
<br>
<label>
	<input type="text" class="box_score" bind:value={data.score.clean} >
	<input type=range class="range_score" bind:value={data.score.clean} min=0 max=10>
</label>
<br>
<label>
	<input type="text" class="box_score" bind:value={data.score.access} >
	<input type=range class="range_score" bind:value={data.score.access} min=0 max=10>
</label>
<br>
<label>
	<input type="text" class="box_score" bind:value={data.score.bugs} >
	<input type=range class="range_score" bind:value={data.score.bugs} min=0 max=10>
</label>
<br>
<label>
	<input type="text" class="box_score" bind:value={data.score.noise} >
	<input type=range class="range_score" bind:value={data.score.noise} min=0 max=10>
</label>


<br>

<input type="button" on:click={click} name="">

<br>

<div>
	<textarea bind:value={data.description} class="area_description" placeholder="Description de la chambre"></textarea>

</div>



<input type="button" name="" on:click={onSubmit}>


<style>



</style>