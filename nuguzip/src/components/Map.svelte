
<script>

  import { onMount  } from 'svelte';

  export let selected_addr = "제주특별자치도 제주시 첨단로 242";
  let map;
  let ta;
  var markers = [];

    export let positions = [];
    export let positions2 = [];
 
 export let marker=()=>{
  console.log(positions)
    var imageSrc = "/marker-remove.png"; 
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
        
    for (var i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
        markers.push(marker);
    }
    for (var i = 0; i < positions.length; i ++) {

        // 마커를 생성합니다
        var new_marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions2[i].latlng, // 마커를 표시할 위치
            title : positions2[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
        markers.push(new_marker);
    }
 }


  let test;


  let sta = "ready"



    let options
    
    let geocoder 
    

  function target() {

    geocoder.addressSearch(selected_addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            console.log(selected_addr,status,result);
              if (status === kakao.maps.services.Status.OK) {
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            };
        }); 
      };
  
  const sleep = ms => new Promise(f => setTimeout(f, ms));


  onMount( async() =>{
    await sleep(100).then(console.log('pas'))
    var container = ta;
    options = {
        center: new kakao.maps.LatLng(37.56641338153323, 126.97796909758367),
        level: 7
      };
    geocoder = new kakao.maps.services.Geocoder();
    map = new kakao.maps.Map(container, options); 


    // 마커 이미지의 이미지 주소입니다

 //$: console.log(script.onload)

  });


</script>

<svelte:head>

</svelte:head>


<div>
<input type="text" id="one" name="" bind:value={selected_addr}>
 <input type="button" id="two" name="" on:click={target}>
 <div id="map2" bind:this={ta}>
   
 </div>  
<input type="button" value="tt" on:click={marker}>

</div>
<style>

  #map2{
    width: 1000px;
    height: 1000px;
  }
</style>