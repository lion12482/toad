<script>
    import {onMount} from 'svelte';

  import Review from '../../components/Review.svelte';

  export let reviews = [1,2];

  let data = {
    "name": "",
    "address": "",
    "road_addr": "",
    "title": "",
    "description": "123",
    "area": "",
    "complex":"",
    "complex_alone": false,
    "roomnum": "",
    "hidden_roomnum": false,
    "direction": "",
    "rooms": undefined,
    "rooms_input": null,
    "managing": null,
    "cost": {
      "insure": null ,
      "rent": null ,
    },
    "bill": 30000,
    "score": null,
    "date": {
      "year_i": null,
      "month_i": null,
      "year_f": null,
      "month_f": null,
    },
    "hidden_date": false,
    "management_include": {
      "tap": undefined,
      "net": undefined,
      "etc": undefined
    },
    "order": {
      "kind": "bad",
      "clean": undefined,
      "bugs": undefined,
      "water": undefined,
      "guard": undefined,
      "noise": undefined,
      "pet": undefined,
      "park": undefined,
      "convenience": undefined,
      "transport": undefined
    }
    ,
    "img" : null,
    "image_head": null,
    "lat" : null,
    "lng" : null
  };

  let ta;
  let options;
  let map;

  const sleep = ms => new Promise(f => setTimeout(f, ms));


  onMount( async ()=>{
    await sleep(100).then(()=>{
      var container = ta;
      options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 2
        };
      map = new kakao.maps.Map(container, options); 
    });
  });
</script>


<svelte:head>
</svelte:head>

<main>

<div class="container">
  <div id="head">
    <span><h2>리뷰열람</h2></span>
    <input type="text" id="search" placeholder="다시 검색하기">
    
  </div>
  
  <div id="construct">
    <div style="min-height: 300px;">
      <div id="map" bind:this={ta}></div>
      <div id="title">
        <h2>title</h2>
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="score">
        <div style="color:grey;">평균평점
        </div>
        <div style="margin-left: 40px;">
          <span><b></b></span>
          <span></span> /10
        </div>
      </div>
      
    </div>
    {#each reviews as fr }
      <Review/>
    {/each}
  </div>
</div>
  <div id="background-head"></div>
  <div id="background-body"></div>

    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=499d6b17d23452a16f3670dec014b121"></script> 

</main>


<style>


  .container{
    display: block;
    width: 1024px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  #head {
    display: block;
    width: 780px;
    height: 50px;
    margin: 0 auto;
    padding: 5px 0;
  }

  #head h2{
    display: inline-block;
    font-weight: bold;
    letter-spacing: 0.1em;
    line-height: 50px;
  }

  #search{
    display: inline-block;
    width: 470px;
    height: 45px;
    padding: 0 15px;
    border-radius: 8px;
    font-size: 18px;
    letter-spacing: 0.1em;
    background-color: var(--toad-color-4);

    float: right;

    border: none;
    outline: none;
  }

  #search::-webkit-input-placeholder{
    text-align: center;
  }

  #search:-moz-placeholder {
    text-align: center;
  }

  #title {
    display: inline-block;
    min-height: 150px;
    max-width: 400px;
  }

  #title div {
    padding-left: 20px;
  }

  #score {
    display: block;
    margin-top: 30px;
    padding-left: 20px;
    font-size: 24px;

  }

  #score div {
    display: inline-block;
  }

    #map {
      display: inline-block;
      float: right;
      width: 300px;
      height: 210px;
      margin-top: 40px;
    }

  #construct {
    display: block;
    width: 730px;
    min-height: 100px;
    
    margin: 0 auto;
    padding: 30px 25px;
    background-color: var(--toad-color-2);
    border-radius: 15px;
    z-index: 3;
    position: relative;



  }

  #background-head{
    position: absolute;
    width: 100%;
    min-width: 1024px;
    height: 300px;
    background-color: var(--toad-color);
    top: 0;
    z-index: 0;
    left: 0;
  }

  #background-body{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: var(--toad-color-2);
    z-index: -1;
  }


</style>