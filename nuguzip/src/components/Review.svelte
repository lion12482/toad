<script>
  import { onMount } from 'svelte';

  import Image from './Image.svelte';

  export let review = {};


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

  console.log(Object.keys(data.order));

  let management;
  onMount(()=>{
    var ky = Object.keys(data.management_include);
    var element;
    ky.forEach(key =>{
      element = data.management_include.key;
      if (management)(management = management + ', ' + data.management_include.key)
      else(management = data.management_include.key)
    });
    management = element;
  });

(function(){
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


<div id="review">
  <div id="title">
    <span><b>{data.score}</b>/10 점</span>
    <div id="date">
      <span>{data.date.year_i}년</span>
      <span>{data.date.month_i}월</span>
      ~
      <span>{data.date.year_f}년</span>
      <span>{data.date.month_f}월</span>
      거주자
    </div>
  </div>
  <div>
    <div class="row" id="row1">
      <div style="width: 70px; background-color: var(--toad-color);">동/호</div><div style="width: 130px">{#if !data.complex_alone}{data.complex}{/if}{#if !data.hidden_roomnum}{data.roomnum}{:else}호수비공개{/if}</div><div style="width: 80px;">{data.direction}</div><div style="width: 160px;">{data.managing}</div><div>{data.rooms_input}</div><div style="width: 120px; border-right: solid 1px var(--toad-color);">{data.area}평 ({Math.ceil10(data.area*3.3,-1)}㎡)</div>
    </div>
    <div class="row" id="row2">
      <div style="width: 207px; background-color: var(--toad-color);">보증금/ 월세+고정관리비</div><div style="width: 247px;" >{data.cost.insure}/ {data.cost.rent} 만원</div><div style="background-color: var(--toad-color);">공과금</div><div style="width: 120px; border-right: solid 1px var(--toad-color);">월평균 {data.bill}원</div>
    </div>
    <div class="row" id="row3">
      <div style="width: 207px; background-color: var(--toad-color);">고정관리비 포함항목</div><div style="width: 481px; border-right: solid 1px var(--toad-color);">{management}</div>
    </div>
  </div>

  {#if data.description}
    <div id="description">
      {data.description}
    </div>
  {/if}

  <div id="order">
    <div>
      <span class="nm">집주인</span>
      <div class="content">
        <span class="off" class:on={data.order.kind =="bad"}>불친절</span>
        <span class="off" class:on={data.order.kind =="normal"}>보통</span>
        <span class="off" class:on={data.order.kind =="good"}>친절</span>
      </div>
    </div>
    <div>
      <span class="nm">청결</span>
      <div class="content">
        <span class="off" class:on={data.order.clean =="bad"}>더러운편</span>
        <span class="off" class:on={data.order.clean =="normal"}>보통</span>
        <span class="off" class:on={data.order.claen =="good"}>깨끗한편</span>
      </div>
    </div>
    <div>
      <span class="nm">벌레</span>
      <div class="content">
        <span class="off" class:on={data.order.bugs =="bad"}>있음</span>
        <span class="off" class:on={data.order.bugs =="normal"}>거의없음</span>
        <span class="off" class:on={data.order.bugs =="good"}>아예없음</span>
      </div>
    </div>
    <div>
      <span class="nm">보안</span>
      <div class="content">
        <span class="off" class:on={data.order.guard =="bad"}>별로</span>
        <span class="off" class:on={data.order.guard =="normal"}>적당한편</span>
        <span class="off" class:on={data.order.guard =="good"}>매우안전</span>
      </div>
    </div>
    <div>
      <span class="nm">방음</span>
      <div class="content">
        <span class="off" class:on={data.order.noise =="bad"}>안됨</span>
        <span class="off" class:on={data.order.noise =="normal"}>적당</span>
        <span class="off" class:on={data.order.noise =="good"}>철저</span>
      </div>
    </div>
    <div>
      <span class="nm">반려동물 가능 여부</span>
      <div class="content">
        <span class="off" class:on={data.order.pet =="bad"}>불가</span>
        <span class="off" class:on={data.order.pet =="normal"}>일부가능</span>
        <span class="off" class:on={data.order.pet =="good"}>모두가능</span>
      </div>
    </div>
    <div>
      <span class="nm">자체주차공간</span>
      <div class="content">
        <span class="off" class:on={data.order.park =="bad"}>없음</span>
        <span class="off" class:on={data.order.park =="normal"}>부족</span>
        <span class="off" class:on={data.order.park =="good"}>충분</span>
      </div>
    </div>
    <div>
      <span class="nm">대중교통접근성</span>
      <div class="content">
        <span class="off" class:on={data.order.transport =="bad"}>안좋음</span>
        <span class="off" class:on={data.order.transport =="normal"}>보통</span>
        <span class="off" class:on={data.order.transport =="good"}>매우좋음</span>
      </div>
    </div>
    <div>
      <span class="nm">편의시설접근성</span>
      <div class="content">
        <span class="off" class:on={data.order.convenience =="bad"}>안좋음</span>
        <span class="off" class:on={data.order.convenience =="normal"}>보통</span>
        <span class="off" class:on={data.order.convenience =="good"}>매우좋음</span>
      </div>
    </div>
  </div>

  <div class="img">
    <Image src="a411cd38671124110b1ed3b1ba79c9d8"/>
  </div>
</div>


<style>

  #review {
    width: 700px;
    border-radius: 15px;
    background-color: var(--toad-color-3);
    padding: 15px 10px;
    margin-bottom: 20px;

  }

  #title {
    margin-bottom: 20px;
  }

  #title span {
    font-size: 24px;
  }

  #date {
    display: inline-block;
    float: right;
    font-size: 16px;
  }

  #date span {
    font-size: 16px;
  }

  .row {
    display: flex;
    height: max-content;
  }

  .row div{
    display: flex;
    width: 100px;
    min-height: 20px;
    margin: 0;
    border: solid;
    border-width: 1px;
    border-color: var(--toad-color);
    border-right: none;
    padding: 3px;
    word-break: break-all;
  }

  #row1 div, #row2 div{
    border-bottom: none;
  }

  #description {
    display: block;
    width: 690px;
    min-height: 75px;
    line-height: 1.5em;
    padding: 3px;
    padding-bottom: 10px;
    margin: 0 auto;
    margin-top: 20px;
    word-break: break-all;

    border: solid 1px var(--toad-color);
  }

  #order {
    margin-top: 20px;
    padding-left: 10px;
  }

  #order div {
    margin-bottom: 3px;
  }

  .nm {
    display: inline-block;
    min-width: 140px;
    margin-right: 40px;

    font-weight: bold;
  }

  .content {
    display: inline-block;
  }

  .content .off {
    color: grey;
  }

  .content .on {
    color: initial;
    font-weight: bold;

  }

  .content span {
    display: inline-block;
    margin-right: 20px;
  }


  .img {
    display: block;
    max-width: 680px;
    max-height: 1000px;
    margin: 20px auto;
  }


</style>