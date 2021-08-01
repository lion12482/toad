<script>
  import { onMount } from 'svelte';

  import View from '../components/View.svelte';


  let ta;
  let options;
  let map;

  let center;

  let location;

  let level;

  let reviews=[];

  $: console.log(center);
  $: console.log(level);


  let keyword = ''
  let result = null
  let err_addr = null
  let selected_addr = null
  let selected_road = null
  let selected_name = null


  $: searchkey = 'https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIxMDYwMzAwMTExNjExMTIzNjQ=&resultType=json&keyword=' + keyword


  function selector (addr) {
    selected_addr = null;
    selected_road = null;
    selected_name = null;
    draw(addr.jibunAddr)
    selected_addr = addr.jibunAddr
    selected_road = addr.roadAddr
    if(addr.bdNm){
      selected_name = addr.bdNm
    }
    else{
      if (addr.jibunAddr.split(/[0-9]/)[addr.jibunAddr.split(/[0-9]/).length - 1]) {
        if (addr.roadAddrPart2.split(',') > 1){
          selected_name = addr.roadAddrPart2.replace('(','').replace(')','').trim();
        }
        else {
          selected_name = addr.jibunAddr.split(/[0-9]/)[addr.jibunAddr.split(/[0-9]/).length - 1].trim();
        }
      }
    };
    keyword = null
    result = null
    data.address = addr.jibunAddr
    data.road_addr = addr.roadAddr
    data.name = selected_name
  };

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


  function draw(selected_addr) { 
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(selected_addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords
          });
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
      };
    }); 
  };


  const sleep = ms => new Promise(f => setTimeout(f, ms));


  onMount( async ()=>{
    await sleep(100).then(()=>{
      var container = ta;
      options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 7
        };
      map = new kakao.maps.Map(container, options); 
      var geocoder = new kakao.maps.services.Geocoder();
      center = map.getCenter();
      searchAddrFromCoords(center, displayCenter);
      kakao.maps.event.addListener(map, 'dragend', function() {    
        // 지도 중심좌표를 얻어옵니다 
        center = map.getCenter(); 
        searchAddrFromCoords(center, displayCenter)
      });  
      kakao.maps.event.addListener(map, 'idle', function() {
        center = map.getCenter();
        searchAddrFromCoords(map.getCenter(), displayCenter);
      });
      function searchAddrFromCoords(coords, callback) {
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);         
      }
      function displayCenter(result, status){
        if (status == kakao.maps.services.Status.OK){
          location = result[0].address.address_name;
          level = map.getLevel();
          var bounds = map.getBounds();
          var sw = bounds.getSouthWest();
          var ne = bounds.getNorthEast();
          let params = {
            "ix": sw.La,
            "iy": sw.Ma,
            "fx": ne.La,
            "fy": ne.Ma
          };
          var query = Object.keys(params).map(k => encodeURIComponent(k) +'='+ encodeURIComponent(params[k])).join('&');
          fetch('/review.json?'+query).then(data => data.json()).then((json) =>{
            reviews = json;
          }).catch(function(err){
            console.log(err);
          })
        }
      }
    });
  });



</script>


<main style="background-color: var(--color-4); ">
  <div class="container">
    <div id="title">
      <span style="font-size: 18px; color: grey; display: inline-block; vertical-align: middle;">건물 검색</span>
      <div class="block_addr">
        <input bind:value = {keyword} class="input_addr" class:err="{err_addr & !selected_addr & !result}" placeholder="건물명 또는 주소를 입력하여 검색해주세요." >
        <div class="block_search">
          {#if result}
            {#if result[0]}
              {#each result as list, index}
                <span class="selector" on:click={selector(list)}>
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
    </div>
    <div id="block_map">
      <span id="coords" class="material-icons">add</span>  
      <div id="map" bind:this={ta}/>
    </div>
    <div id="location"><b>{location}</b>의 리뷰 {reviews.length}개 보기</div>
    <br>

    {#each reviews as rv}

      <View article={rv}/>
    {/each}
  </div>
  <div><br></div>
  <div id="background">
    <div class="background" id="background-head"></div>
    <div class="background" id="background-top"></div>
    <div class="background" id="background-body-2"></div>
    <div class="background" id="background-body-1"></div>

  </div>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=499d6b17d23452a16f3670dec014b121"></script> 

</main>


<style>

:root {
  --color-1: rgb(1,83,130); 
  --color-2: rgb(178,204,221);
  --color-3: rgb(245,236,218);
  --color-4: rgb(246,245,239);
  --color-5: rgb(248,242,229);
  --color-6: rgb(249,248,244);
  --color-7: rgb(201,219,231);
}

  div{
    position: relative;
    z-index: 2;
  }

  .container {
  }

  #title {
    width: 760px;
    height: 70px;
    margin: 0 auto;
    z-index: 4;
  }


.block_addr {
  display: inline-block;
  margin-top: 20px;
  height: 80px;
  min-height: 50px;
  position: relative;
  z-index: 4;
}

.block_addr .input_addr {
  display: block;
  width: 500px;
  height: 45px;
  padding: 0 10px;
  padding-left: 20px;
  font-size: 18px;

  outline: none;
  border-radius: 5px;
  border: none;

  background-color: var(--color-7);
}


.input_addr::-webkit-input-placeholder{
  text-align: center;
}

.ipnut_addr:-moz-placeholder {
  text-align: center;
}

.block_addr .block_search {
  display: block;
  height: fit-content;
  position: absolute;
  left: 40px;
  border: solid 1px lightgray;
  border-radius: 15px;
  background-color: white;
  z-index: 4;
}

.block_selected {
  display: inline-block;
  padding-left: 40px;
}

.block_search .addr_jib {
  font-size: 16px;
}

.block_search .addr_road {
  font-size: 13px;
  padding-left: 15px;
}
.block_search .selector {
  display: inline-block;
  width: 450px;
  height: fit-content;
  padding: 3px 15px;
  border-color: lightgrey;
  cursor: pointer;
  background-color: initial;
}

.block_search .selector:hover {
  transition-property: background-color,color;
  background-color: lightblue;
  color: white;
}




  #block_map {
    position: relative;
    width: max-content;
    margin: 0 auto;
    z-index: 3;
  }

  #map {
    display: block;
    width: 760px;
    height: 450px;
    border-radius: 60px;
    z-index: 3;
  }

  #location {
    display: block;
    position: relative;
    width: 760px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin: 0 auto;
    border-radius: 8px;

    background-color: var(--color-5);

    z-index: 3;
  }

  #coords {
    display: block;
    z-index: 4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 24px;
  }

  #background{
    display: block;
    position: absolute;
    min-width: 1024px;
    width: 100%;
    top:0;
    z-index: 0;
  }
  .background{
    display: block;
    z-index: 0;

  }

  #background-head {
    top: 0;
    height: 80px;

   background-color: var(--color-1); 
  }

  #background-top{
    height: 450px;

    background-color: var(--color-2);
  }

  #background-body-1 {

    height: 100px;

    background-color: var(--color-3);
  }

  #background-body-2{

    height: 15px;

    background-color: white;
  }

</style>