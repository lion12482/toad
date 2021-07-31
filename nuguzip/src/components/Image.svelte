<script>
export let src;
export let head;

let pop_state;

const pop = () =>{
	pop_state = !pop_state;
}

$: image_src = '/load/' + src;

</script>

<div>
	<div style="position: relative;">
		<img alt="" src={image_src} on:click={pop}>
		{#if src==head}
			<span class="material-icons" style="">check</span>
		{/if}
		<slot>
		</slot>
	</div>
		{#if pop_state}
			<span id="back" on:click={pop}></span>
			<div class="popup"><img src={image_src}>
			<span class="material-icons" style="position: absolute; top: 0; right: 0; color: red; cursor: pointer;" on:click={pop}>clear</span></div>
		{/if}
</div>

<style>
	div {
		display: inline-block;
		max-width: inherit;
		height: inherit;
		vertical-align: middle;
		position: relative;
	}

	img {
		height: inherit;
		max-width: inherit;
		max-height: inherit;
	}


	#back {
		display: block;
		width: 110%;
		height: 110%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		background-color: rgba(0,0,0,0.5);
	}

	.popup {
		display: block;
		background-color: white;
		width: max-content;
		height: max-content;
		min-width: 100px;
		min-height: 75;
		max-width: 960px;
		max-height: 780px;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 3;
		position: absolute;
	}
</style>