<script context="module">
  // console.log('module script');
  export async function preload(page, session) {
		const res = await this.fetch('http://lion124.iptime.org:8000');
		const ret = await res.json();

		return { ret };
  }

</script>

<script>
import Map from '../components/Map.svelte';


export let ret;

$: positions = [];
$: positions2  = [];

function call_date(date) {
	var url = './test.json?date=' + date ;
	let nl = [];
	let dl = [];
	fetch(url).then((res)=>{
		return res.json();
	}).then((rej)=>{
		try{
			rej['new'].forEach((nw)=>{
				try {
					if(nw){
						nl.push({
							title: nw['title'],
							latlng: new kakao.maps.LatLng(nw['location'][1], nw['location'][0])
							});
					}
				} catch(err){
					console.error(err);
				}	
				})
			positions = nl;
			rej['del'].forEach((de)=>{
				try{
					if(de){
						dl.push({
							title: de['title'],
							latlng: new kakao.maps.LatLng(de['location'][1], de['location'][0])
							});
					}
				} catch(err){
					console.error(err);
				}
				});
			positions2 = dl;
		} catch(err){
			console.error(err);
		}
	});
};

``

</script>

<svelte:head>

</svelte:head>

<div>
	
 
	<Map {positions} {positions2}/>

	<br>
	{#each ret as date }
		<input type="button" value={date} on:click={call_date(date)}>
		<br>
	{/each}
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=499d6b17d23452a16f3670dec014b121"  ></script> 
</div>