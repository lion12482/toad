<script>

  import { onMount  } from 'svelte';
  import { slide } from 'svelte/transition';

  import { quintOut } from 'svelte/easing';

  let ad;

  export let article={
    "name": "",
    "address": "",
    "road_addr": "",
    "title": "",
    "description": "",
    "area": "",
    "complex":"",
    "complex_alone": false,
    "roomnum": "",
    "hidden_roomnum": false,
    "direction": null,
    "rooms": undefined,
    "rooms_input": null,
    "managing": null,
    "cost": {
      "insure": null ,
      "rent": null ,
    },
    "bill": null,
    "score": null,
    "date": {
      "year_i": null,
      "month_i": null,
      "year_f": null,
      "month_f": null,
    },
    "hidden_date": false,
    "management_include": {
      "tap": false,
      "net": false,
      "etc": false,
      "etc_cont": null,
    },
    "order": {
      "kind": undefined,
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


 const selected_addr = article.address;

  let ta;
  let options
  let geocoder 
  let map

  const draw = ()=>{
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
    await sleep(100)
    var container = ta;
    options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2
      };
    geocoder = new kakao.maps.services.Geocoder();
    map = new kakao.maps.Map(container, options); 
    geocoder.addressSearch(selected_addr, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });
        map.setCenter(coords);
      };
    }); 
  });


  let fold = false;

  const folding = ()=>{
    fold = !fold;
  }


</script>

<svelte:head>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
</svelte:head>

<main>

<div class="container">
  <div class="construct">
    <div class="reviews">
      <div class="article">
        <div class="board">
          <div class="block_adr">
            {#if article.name}
              <div class="const_name front_addr" >
                {article.name}
              </div>
            {/if}
            <div class="const_ad">
              <span class="ad_jibun" class:front_addr={!article.name}>{article.address}</span><br>
              {#if article.road_addr}
                <span class="ad_road under_addr">{article.road_addr}</span>
              {/if}
            </div>
          </div>            
          <div class="block_map" bind:this={ta}>
            지도
          </div>            
          <div class="block_score">
            <span class="total_score">종합점수 {article.score} / 10</span>
          </div>
          <div class="block_sub" style="display: none;">
            <div class="block_img">
              <div class="img_article">사진 </div>
              <span>num pic</span>
            </div>
          </div>
          {#if article.cost.insure | article.cost.rent}
            <div class="cost">
              <span>계약금액 </span><span style="font-size: 18px;">(보증금 / 월세+관리비)</span>
              <br>
              <div class="block_cost">
                <span class="insure">{article.cost.insure}</span> &nbsp/
                <span class="rent">{article.cost.rent}</span>
              </div>
            </div>
          {/if}
          {#if article.description}
            <div class="detail_block">
              <pre class="descript">{article.description}</pre>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

</main>


<style>



.container {
  display: block;
  width: 1024px;
  margin: 0 auto;

}


.divide {
  display: block;
  width: 90%;
  margin: 0 auto;
  border-top: solid 1px black;
}

.fold {
  display: block;
  min-width: 280px;
  width: 95%;
  margin: 0 auto;
  border-top: solid 2px grey;
}



.block_score #fold_cont {
  display: block;
  padding-left: 10px;
  vertical-align: middle;
  cursor: pointer;
}

#fold_cont span {
  margin-left: 30px;
  cursor: pointer;
}


.block_score .material-icons {
  vertical-align: text-top;
  font-size: 28px;
  cursor: pointer;
}

.construct {
  padding: 0 100px;
  padding-top: 0;
  position: relative;

  

}



.cost {
  display: block;
  margin-top: 20px;
  font-size: 18px;
}

.cost span {
  font-size: 24px;
}

.block_cost {
  display: inline-block;
  margin-left: 40px;
}

.block_cost span{
  font-size: 18px;
}



.block_adr {
  display: block;
  width: 400px;
  padding: 10px 0px;
  word-break: keep-all;
}

.block_map {
  display: block;
  width: 280px;
  height: 280px;
  
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
  background-color: lightblue;

}


.block_info {
  display: block;

  height: 350px;
  padding-left: 20px;
  padding-top: 10px;

  border: solid 1px orange;
}

.block_info .const_name {
  font-size: 24px;
}

.front_addr{
  font-size: 24px
}

.under_addr{
  font-size: 16px;
  padding-left: 10px;
}

.block_info .cost_ad {
  padding-left: 10px;
}



.block_info .img_info {
  display: block;
  width: 350px;
  height: 240px;
  margin-top: 10px;
  margin-left: 60px;

  border: solid 1px gold;

}

.article {
  display: block;
  width: 700px;
  min-height: 200px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 30px;
  position: relative;
  padding: 5px 8px;


  border-radius: 15px;
  border: solid 1px grey;

}

.total_score {
  display: inline-block;
  width: 200px;
  vertical-align: top;

  font-size: 24px;
}



.board {
  display: block;
  width: 640px;
  min-height: 300px;
  height: fit-content;
  margin: 0 auto;
  padding-top: 20px;

}

.board .block_score {
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
}


.np .block_score {
  width: 100%;
}


.board .block_sub {
  display: inline-block;
  margin-left: 30px;
  vertical-align: top;
}

.board .scoreboard {
  display: block;
  width: 280px;
  min-height: 140px;
  padding: 20px 10px;
  padding-right: 0;
  vertical-align: middle;

}

.np .scoreboard {
  width: 100%;
  height: 80px;
}

.score {
  display: inline-block;
  min-width: 240px;
  margin-bottom: 20px;
  padding-left: 5px;
  font-size: 18px;
}

.np .score {
  min-width: 180px;
  margin-bottom: 20px;
}

.score span {
  display: inline-block;
  min-width: 20px;
  float: right;
  margin-left: 10px;
}



.board .block_img {
  display: block;

  border: solid 1px gold;
}

.block_img .img_article {
  display: block;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  border: solid 1px blue;
}

.block_img span{
  display: inline-block;
  width: 100%;
  text-align: center;
}


.detail_block {

}

.detail_block h2 {
  font-size: 24px;

}

.detail_block .descript {
  display: block;
  width: 580px;
  min-height: 50px;
  padding: 5px 0;
  margin: 30px auto;
  margin-bottom: 20px;
  vertical-align: middle;
  font-family: SpoqaHan-sans;

}



</style>