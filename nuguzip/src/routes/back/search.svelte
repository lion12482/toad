<script>
	let keyword = ''
	let result = null
	let err_addr = null
	let selected = null


	$: searchkey = 'https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIxMDYwMzAwMTExNjExMTIzNjQ=&resultType=json&keyword=' + keyword



	function selector (addr) {
		selected = addr
		keyword = null
		result = null
	}


	async function liveGet () {
		try {
			const res = await fetch(searchkey)
			result = await res.json()
			result = result.results.juso
		}
		catch (e){
			console.log('e')
			if (keyword){
				err_addr = true;
			}
		}
		if (result){
			console.log('p')
		}
		else {
			console.log('n')
			if (keyword) {		
				err_addr = true;
			}
		}
	}


</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<div id="container">
	<h1>주소를 입력해 주세요</h1>

	<input bind:value = {keyword} class:err="{err_addr & !selected & !result}">



	<br>
	{#if selected}
		<span> Selected : {selected}</span>
	{/if}
	<br>
	<div id = "search_block">
		{#if result}
			{#if result[0]}
				{#each result as list, index}
					<span class="selector" on:click={selector(list.jibunAddr)}>
						<span class="addr_jib">{list.jibunAddr}</span><br>
						<span class="addr_road">{list.roadAddr}</span>

					</span>
					<br>
				{/each}
			{/if}
		{/if}
	</div>
	{#if keyword & liveGet()}
		<br>
	{/if}


	<div id="map" style="width:500px;height:400px;"></div>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=499d6b17d23452a16f3670dec014b121"></script>
	<script>
		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		var map = new kakao.maps.Map(container, options);
	</script>	
</div>

<style>

#container {
	display: block;
	width: 780px;
	position: relative;
	margin: 0 auto;
}

.err {
	border: solid 1px red;
}

.selector {
	display: inline-block;
	width: 400px;
	height: fit-content;
	padding: 3px 15px;
	border-color: lightgrey;
	cursor: pointer;
	background-color: initial;
}

.selector:hover {
	transition-property: background-color,color;
	background-color: lightblue;
	color: white;
}

.addr_jib {
	font-size: 16px;
}

.addr_road {
	font-size: 13px;
	padding-left: 15px;
}

#search_block {
	display: block;
	height: fit-content;
	position: absolute;
	border: solid 1px lightgray;
	border-radius: 15px;
}
</style>
