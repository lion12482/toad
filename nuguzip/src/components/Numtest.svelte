<script>
	  let test = [1,2,3,45,6];
  let con = 0;

  $: console.log(con);

  const tar = ()=>{
  	con  = con +1;
  };

</script>

<main>
	
	{#each test as num }
		{#if num >= con }
			<span>{num}</span>
			<input type="button" name="" on:click={tar}>
			<br>
			{/if}
	{/each}
</main>