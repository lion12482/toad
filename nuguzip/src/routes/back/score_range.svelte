<script>
	let a = 5;
	let b = 2;

	$: c =a+b;
</script>

<label>

	<input type=range bind:value={a} min=0 max=10>
</label>
<br>
<label>

	<input type=range bind:value={b} min=0 max=10>
</label>

<p>{a} + {b} = {c}</p>