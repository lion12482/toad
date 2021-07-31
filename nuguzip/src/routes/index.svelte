<script context="module">
  // console.log('module script');
  export async function preload(page, session) {
		const res = await this.fetch('/review.json');
		const reviews = await res.json();

		return { reviews };
  }
</script>


<script>

	import View from '../components/View.svelte';

	export let reviews;


	let keyword = ''
	let result = null
	let err_addr = null
	let selected = null

	$: kwd_focus = true

	function blur(){
		document.getElementById('search_block').style['visibility'] = 'hidden';
	}
	function focus(){
		document.getElementById('search_block').style['visibility'] = 'visible';
	};
	
	$: console.log(kwd_focus);


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
			if (keyword){
				err_addr = true;
			}
		}
		if (result){
			console.log('p')
		}
		else {
			if (keyword) {		
				err_addr = true;
			}
		}
	}

	function d(ic) {
		if (ic) {
			let td = []
			reviews.forEach(element => {
				if (element.address.includes(ic)) {
					td.push(element);
				}
			});
			return td;
		}
		return reviews;
	}

	$: fr = d(selected);

</script>
<svelte:head>
	
</svelte:head>
<article>

	<br>
	<a type="button" class="create" name="" href="create">리뷰 작성하러 가기</a>
	<br>
	<div class="search">
		<h1>주소를 입력해 주세요</h1>

		<input bind:value = {keyword} on:focus={focus} on:blur={blur} class:err="{err_addr & !selected & !result}">
		<br>
		{#if selected}
			<span> Selected : {selected}</span>
		{/if}
		<br>
		<div id = "search_block" >
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

	</div>

	{#each fr as review }
		<View article={review}/>
	{/each}
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=499d6b17d23452a16f3670dec014b121"  ></script> 
</article>

<style>
	
	.create {
		display: block;
		width: 150px;
		height: 30px;
		cursor: pointer;
		text-decoration: none;
		border-radius: 8px;
		border: none;
		background-color: #c5a880;

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
	background-color: white;
	z-index: 1;
	overflow: hidden;
}


</style>