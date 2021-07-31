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
    await sleep(100).then(console.log('pas'))
    var container = ta;
    options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 2
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



</script>


<main>
  <div id="block_map">
    <span id="coords" class="material-icons">add</span>  
    <div id="map" bind:this={ta}/>
  </div>
  <div id="location"><b>{location}</b>의 리뷰 {reviews.length}개 보기</div>
  <br>

  {#each reviews as rv}

    <View article={rv}/>
  {/each}

  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=499d6b17d23452a16f3670dec014b121"></script> 

</main>


<style>

  #block_map {
    position: relative;
    width: max-content;
  }

  #map {
    display: block;
    width: 760px;
    height: 500px;
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

</style>