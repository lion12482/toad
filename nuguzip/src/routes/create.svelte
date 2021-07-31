<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';

  import Need from '../components/Need.svelte';
  import Image from '../components/Image.svelte';

  const handleSubmit = async () => {
    if (data.address) {
      const res = await fetch('review.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      goto('./');
    }
    else {
      window.alert('address input needed');
    }
  }

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



  let data = {
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
    "rooms": 1,
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
      "tap": undefined,
      "net": undefined,
      "etc": undefined
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



let check_err = true;

let input_etc = false;
let rooms_input;

  function r(i){
    if (data.rooms == 1){
      return "원룸"
    }
    else if ( data.rooms == 2 ){
      return "투룸"
    }
    else if ( data.rooms == 3 ){
      return "쓰리룸"
    }
    else {
      if(rooms_input){
        return rooms_input
      }
    }
  }

  function c(i) {
    if(input_etc){
      return i
    }
    else {
      return undefined
    }
  };

  function d(i) {
    if (i > 10) { 
      return 10
    }
    else {
      return i 
    }
  };

  $: data.management_include.etc = c(data.management_include.etc);
  $: data.rooms_input = r(data.rooms);
  $: if(rooms_input){
      data.rooms_input = r(data.rooms);
    }
  $: data.score = d(data.score);

  $: err_date = Checkdate(data.date.year_i,data.date.month_i,data.date.year_f,data.date.month_f);

function Checkdate(year_i,month_i,year_f,month_f){
  var stDate = new Date(year_i,month_i);
  var endDate = new Date(year_f,month_f);
  var deltatime =  endDate.getTime()  - stDate.getTime();
  if (!year_i || !month_i || !year_f || !month_f){
    deltatime = -1;
  };
  return deltatime
}


  let ta;
  let options;
  let map;


  function draw(selected_addr) { 
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(selected_addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          data.lat = result[0].y;
          data.lng = result[0].x;
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


  let  avatar, fileinput;
  
  let img_data ;

  const onFileSelected =(e)=>{
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      avatar = e.target.result;
      img_data = image;
      imageSubmit();
    };
  };
  
  const imageSubmit = async () => {
    const formData = new FormData();
    formData.append('file', img_data)
    if (avatar) {
      fetch('upload', {
        method: 'POST',
        body: formData,
        headers: { 
          'Accept-post': 'multipart/form-data',
          'Accept': 'multipart/form-data'},
      }).then((res) => {
        res.text().then((text)=>{
          if (!data.image_head) {
            data.image_head = text;
          };
          inputs=[...inputs,text];
          });
      });
    }
    else {
      window.alert('image input needed');
    }
  }

  let deletetarget;
  $: console.log(deletetarget);

  const deleteImage=(e)=> {
    console.log(e);
    var i = e.target.id;
    var temp = inputs.splice(i,1);
    inputs = inputs;
    var check = false;
    inputs.forEach(id => {
      if(id==data.image_head){
        check = true;
      };
    });
    if(!check) {
      data.image_head = inputs[0]
    }
  }


  let inputs = [];




  onMount( async ()=>{
    await sleep(100).then(console.log('pas'))
    var container = ta;
    options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2
      };
    map = new kakao.maps.Map(container, options); 

  });

(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

</script>


<svelte:head>
</svelte:head>

<div class="container">
  <div class="construct">
    <div class="block_write">
        <div class="block_map" bind:this={ta} class:map_pre="{!selected_addr}">
          지도
        </div>
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
        <br>
        <div class="block_selected">
          {#if selected_addr}
            {#if selected_name}
              <h2>{selected_name}</h2>
              <span style="display: inline-block; padding-left: 20px;"> {selected_addr} <br> <br><span style="font-size: 14px;">{selected_road}</span> </span>
            {:else}
              <h2>{selected_addr}</h2>
              <span style="padding-left: 20px;">{selected_road}</span>
            {/if}
          {/if}
        </div>
        <br>

      </div>
      {#if selected_addr }
        <div class="block_info">
          <div class="divide" />
          <div class="total">
            <div class="subtitle">
              <span>총평</span>
            </div>
            <div class="subcont">
              <div>
                <span>거주기간</span>
                <select name="year_i" bind:value={data.date.year_i} class:err="{err_date < 0 & check_err}">
                  <option selected hidden></option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                  <option>2014</option>
                  <option>2013</option>
                  <option>2012</option>
                  <option>2011</option>
                  <option>2010</option>
                  <option>2009</option>
                  <option>2008</option>
                  <option>2007</option>
                  <option>2006</option>
                  <option>2005</option>
                  <option>2004</option>
                  <option>2003</option>
                  <option>2002</option>
                  <option>2001</option>
                </select>
                년
                <select name="month_i" bind:value={data.date.month_i} class:err="{err_date < 0 & check_err}">
                  <option selected hidden></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                월 ~  &nbsp
                <select name="year_f" bind:value={data.date.year_f} class:err="{err_date < 0 & check_err}">
                  <option selected hidden></option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                  <option>2014</option>
                  <option>2013</option>
                  <option>2012</option>
                  <option>2011</option>
                  <option>2010</option>
                  <option>2009</option>
                  <option>2008</option>
                  <option>2007</option>
                  <option>2006</option>
                  <option>2005</option>
                  <option>2004</option>
                  <option>2003</option>
                  <option>2002</option>
                  <option>2001</option>
                </select>년
                <select name="month_f" bind:value={data.date.month_f} class:err="{err_date < 0 & check_err}">
                  <option selected hidden></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>월

                <div style="display: inline-block;">
                  
                  <input type="checkbox" id="hidden_date" bind:value={data.hidden_date}><label for="hidden_date">비공개 </label>
                </div>
              </div>
              <div>
                <span>총점</span>
                <input type="number" name="" id="score"  bind:value={data.score} class="inp_short" class:err="{!data.score & check_err}">
                / 10 점
              </div>
              <div>
                <textarea bind:value={data.description} class="area_description" placeholder="이 방에 대한 총평을 작성해주세요."></textarea>
              </div>
            </div>
          </div>
          <div class="divide"/>
          <div class="base">
            <div class="subtitle">
              <span>기본정보</span>
            </div>
            <div class="subcont">
              <div>
                <span>가격</span>
                <input type="number" name="" bind:value={data.cost.insure} class="inp_long" class:err="{!data.cost.insure & check_err}" placeholder="보증금" >
                만원 / 
                <input type="number" name="" style="width: 100px;"  bind:value={data.cost.rent} class="inp_long" class:err="{!data.cost.rent & check_err}" placeholder="월세+고정관리비">
                만 원
              </div>
              <div class="manage">
                <span> &nbsp └고정관리비 포함항목</span>
                <label><input type="checkbox" name="" value="수도" bind:checked={data.management_include.tap}> 수도</label>
                <label><input type="checkbox" name="" value="인터넷" bind:checked={data.management_include.net}> 인터넷</label>
                <label><input type="checkbox" name="" value="true"  bind:checked={input_etc}> 기타 
                <input type="text" name="" class="inp_long" class:err="{data.management_include.etc & check_err}" placeholder="직접입력" style="margin:0;" bind:value={data.management_include.etc}></label>
              </div>
              <div>
                <span>평균공과금</span>
                <input type="number" name="" bind:value={data.bill} style="width: 80px;" placeholder="전기+가스 등" class:err="{!data.bill & check_err}"> 원
              </div>
              <div>
                <span>동</span>
                <input type="text" name="" bind:value={data.complex} class="inp_short" > 동 
                <label><input type="checkbox" name="" style="width: initial;" bind:checked={data.complex_alone} class="inp_short"  >단일동</label>
              </div>
              <div>
                <span>호수</span>
                <input type="text" name="" bind:value={data.roomnum} class="inp_short"> 호
                <label><input type="checkbox" name="" bind:checked={data.hidden_roomnum}>비공개</label>
              </div>
              <div>
                <span>방향</span>
                <select name="direction" bind:value={data.direction} required style="margin-left: 20px;" class:err="{ !data.direction  & check_err}">
                  <optgroup label="메인창문방향">
                    <option selected hidden></option>
                    <option>북</option>
                    <option>북동</option>
                    <option>동</option>
                    <option>남동</option>
                    <option>남</option>
                    <option>남서</option>
                    <option>서</option>
                    <option>북서</option>
                    <option>창문 없음</option>
                    <option>모름</option>
                  </optgroup>
                </select>
                향
              </div>
              <div>
                <span>크기</span>
                <input type="number" name="" bind:value={data.area
                } class="inp_short" class:err="{ !data.area & check_err}" max="999" >
                평   =  &nbsp  {Math.ceil10(data.area*3.3,-1)}㎡
              </div>
              <div class="manage">
                <span>방 개수 <div style="color: grey; display: inline-block; font-weight: normal;">*거실제외</div></span>
                <label><input type="radio" name="num_rooms" value="1" bind:group={data.rooms} checked> 원룸 </label>
                <label><input type="radio" name="num_rooms" value="2" bind:group={data.rooms}> 투룸</label>
                <label><input type="radio" name="num_rooms" value="3" bind:group={data.rooms}> 쓰리룸</label>
                <label><input type="radio" name="num_rooms" value="4" bind:group={data.rooms}> 기타 <input type="text" name="" bind:value={rooms_input} class="inp_long" placeholder="직접입력" style="margin:0;" class:err="{data.rooms=='etc'&!data.rooms_input & check_err}"></label>
              </div>
              <div class="manage">
                <span>관리형태</span>
                <label><input type="radio" name="managing" value="direct" bind:group={data.managing} checked> 주인또는가족이 직접</label>
                <label><input type="radio" name="managing" value="management" bind:group={data.managing}> 별도관리자</label>
              </div>
            </div>
          </div>
          <div class="divide"/>
          <div class="evaluate">
            <div class="subtitle" >
               평가항목
            </div>
            <div class="subcont" style="display: inline-block;">
              <div>
                <span>집주인</span>
                <label>불친절<input type="radio" name="kind" value="bad" bind:group={data.order.kind}></label>
                <label>보통<input type="radio" name="kind" value="normal" bind:group={data.order.kind}></label>
                <label>친절함<input type="radio" name="kind" value="good" bind:group={data.order.kind}></label>
              </div>
              <div>
                <span>청결</span>
                <label>더러운편<input type="radio" name="clean" value="bad" bind:group={data.order.clean}></label>
                <label>보통<input type="radio" name="clean" value="normal" bind:group={data.order.clean}></label>
                <label>깨끗한편<input type="radio" name="clean" value="good" bind:group={data.order.clean}></label>
              </div>
              <div>
                <span>벌레</span>
                <label>있음<input type="radio" name="bugs" value="bad" bind:group={data.order.bugs}></label>
                <label>거의없음<input type="radio" name="bugs" value="normal" bind:group={data.order.bugs}></label>
                <label>아예없음<input type="radio" name="bugs" value="good" bind:group={data.order.bugs}></label>
              </div>
              <div>
                <span>수압</span>
                <label>약함<input type="radio" name="water" value="bad" bind:group={data.order.water}></label>
                <label>적당<input type="radio" name="water" value="normal" bind:group={data.order.water}></label>
                <label>강함<input type="radio" name="water" value="good" bind:group={data.order.water}></label>
              </div>
              <div>
                <span>보안</span>
                <label>별로<input type="radio" name="guard" value="bad" bind:group={data.order.guard}></label>
                <label>적당히안전함<input type="radio" name="guard" value="normal" bind:group={data.order.guard}></label>
                <label>매우안전함<input type="radio" name="guard" value="good" bind:group={data.order.guard}></label>
              </div>
              <div>
                <span>방음</span>
                <label>안됨<input type="radio" name="noise" value="bad" bind:group={data.order.noise}></label>
                <label>적당<input type="radio" name="noise" value="normal" bind:group={data.order.noise}></label>
                <label>철저<input type="radio" name="noise" value="good" bind:group={data.order.noise}></label>
              </div>
              <div>
                <span>반려동물 가능 여부</span>
                <label><input type="radio" name="pet" value="bad" bind:group={data.order.pet}>불가</label>
                <label>일부가능<input type="radio" name="pet" value="normal" bind:group={data.order.pet}></label>
                <label>모두가능<input type="radio" name="pet" value="good" bind:group={data.order.pet}></label>
              </div>
              <div>
                <span>자체주차공간</span>
                <label>없음<input type="radio" name="park" value="bad" bind:group={data.order.park}></label>
                <label>부족<input type="radio" name="park" value="normal" bind:group={data.order.park}></label>
                <label>충분<input type="radio" name="park" value="good" bind:group={data.order.park}></label>
              </div>
              <div>
                <span>대중교통접근성</span>
                <label>안좋음<input type="radio" name="transport" value="bad" bind:group={data.order.transport}></label>
                <label>보통<input type="radio" name="transport" value="normal" bind:group={data.order.transport}></label>
                <label>매우좋음<input type="radio" name="transport" value="good" bind:group={data.order.transport}></label>
              </div>
              <div>
                <span>편의시설접근성</span>
                <label>안좋음<input type="radio" name="convenience" value="bad" bind:group={data.order.convenience}></label>
                <label>보통<input type="radio" name="convenience" value="normal" bind:group={data.order.convenience}></label>
                <label>매우좋음<input type="radio" name="convenience" value="good" bind:group={data.order.convenience}></label>
              </div>
            </div>
          </div>

          <div class="divide"/>
          <div class="pic">
            <div class="subtitle">
              사진
            </div>
            <div class="pic_list"> 
              <div class="pic_add"  on:click={()=>{fileinput.click();}}>
                <span class="material-icons" style="display: block; width: 100%; position: absolute; text-align: center; color: var(--toad-color); line-height: 120px;">add</span>
              </div>                
              <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
              <div class="pic_block">
                <div style="width: max-content">
                {#each inputs as ipt , index }
                  <div style="display: inline-block;">
                    <Image src={ipt} head={data.image_head}>
                    <span class="btn_delete" type="button" on:click={deleteImage} id={index}>삭제</span></Image>
                  </div>
                {/each}
              </div>
              </div>
            </div>            
          </div>
          <br>
        </div>
      {/if}

    </div>
  </div>

  {#if selected_addr}
    <input type="button" class="submit"  name="" on:click={handleSubmit} value="리뷰 입력하기" >
  {/if}
  <br>

    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=499d6b17d23452a16f3670dec014b121"></script> 

</div>



<style>

label {
  cursor: pointer;
}

.block_info input[type="text"],input[type="number"] {
  min-width: 10px;
}


#score::-webkit-outer-spin-button,
#score::-webkit-inner-spin-button {
  -webkit-appearance: auto;
  margin: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.container {
  display: block;
  width: 1024px;
  min-height: 780px;
  margin: 0 auto;

}


.divide {
  display: block;
  width: 95%;
  margin: 0 auto;
  border-top: solid 0.5px var(--toad-color);
}

.err {
  border: solid 1px red;
}

.map_pre {
  visibility: hidden;
}

.block_addr {
  display: block;
  margin-top: 20px;
  min-height: 350px;
  position: relative;
}

.block_addr .input_addr {
  display: block;
  width: 730px;
  height: 45px;

  margin: 0 auto;
  padding: 0 10px;

  font-size: 24px;

  outline: none;
  border-radius: 5px;
  border: none;

  background-color: var(--toad-color-2);
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
  z-index: 2;
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


.construct {
  padding: 30px 100px;
  
  position: relative;
}

.block_write {
  display: block;
  min-height: 500px;

  position: relative;

  background-color: white;
}

.block_map {
  display: block;
  width: 350px;
  height: 250px;
  
  position: absolute;
  right: 40px;
  top: 90px;
  z-index: 2;
  background-color: lightblue;

}

.block_info {
  padding: 10px 30px;
}

.block_info .input_num {
  width: 50px;
}

.block_info .cost {
  margin-top: 10px;
}

.block_info .cost span {
  display: inline-block;
  min-width: 60px;
}


.block_score {

}

.block_score span {
  display: inline-block;
  min-width: 140px;
  height: 30px;
}

.block_score .box_score {
  width: 40px;
  height: 20px;
  font-size: 16px;
  padding: 1px 2px;
}



.area_description {
  display: block;
  width: 600px;
  height: 100px;
  min-height: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px 5px;

  resize: none;

  border-color: var(--toad-color-2)
}


.submit {
  display: block;
  width: 150px;
  height: 30px;

  margin: 0 auto;
  cursor: pointer;
  font-size: 18px;
  background-color: #c5a880;
  border-radius: 8px;
  border: none;
}


.evaluate {
  display: block;
  padding: 10px 0 ;
}

.evaluate span {
  display: inline-block;
  font-weight: bold;
  line-height: 26px;
  min-width: 130px;
  margin-right: 30px;
}

.evaluate label {
  display: inline-block;
  cursor: pointer;
  min-width: 30px;
  margin-right: 30px;
  vertical-align: top;
}

.evaluate label span {
  font-weight: normal;
  display: inline-block;
}


.evaluate label input {
  display: inline-block;
  float: left;
  vertical-align: top;
}

.evaluate input[type="radio"] {
  vertical-align: middle;
  margin-top: 5px;
}

.pic {
  display: block;
  padding: 15px 0;
}

.pic .pic_list {
  display: inline-block;
  width: 620px;
  height: 180px;
  margin-top: 10px;
  overflow-x: auto;
  overflow-y: visible;
}

.pic .pic_add {
  display: inline-block;
  width: 180px;
  height: 120px;
  position: relative;
  cursor: pointer;
  background-size: contain;
  background-position: center; 
  background-repeat: no-repeat;
  vertical-align: middle;

  border: solid 2px var(--toad-color-2);
}

.pic .pic_block {
  display: inline-block;
  width: 400px;
  height: 120px;
  vertical-align: middle;
}

.pic .btn_delete{
  display: inline-block;
  width: 30px;
  position: absolute;
  bottom: -20px;
  right: 0;
  color: red;
  cursor: pointer;
  font-size: 12px;
}



.subtitle {
  display: inline-block;
  min-width: 60px;
  vertical-align: top;
  margin: 5px 10px;
  margin-right: 20px; 
  font-weight: bold;
  color: grey;
}

.subcont {
  display: inline-block;
}

.subcont div {
  margin: 10px 0;
}

.subcont div span {
  display: inline-block;
  min-width: 125px;
  font-weight: bold;
}

.subcont div input {
  margin-left: 20px;
}


.subcont input[type="text"], .subcont input[type="number"] {
  padding-left: 3px;
}

.subcont .inp_short {
  width: 35px;
}

.subcont .inp_long {
  width: 90px;
}


.manage input {
  margin:0;
}

.manage label {
  margin-right: 20px;
  cursor: pointer;
}


.evaluate .subcont input[type="radio"] {
  margin-left: 10px;
}

</style>