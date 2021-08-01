<script>
	import Header from "../components/Header.svelte";


</script>

<style>
.container {
	display: block;
	min-height: 860px;
	z-index: 0;

}

</style>


<div style="min-height: 100%;">
	<Header/>
	<article class="container"><slot></slot></article>
	    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=499d6b17d23452a16f3670dec014b121"></script> 

</div>