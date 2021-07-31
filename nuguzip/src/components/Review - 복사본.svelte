<script>
  export let data = {
    score: 0
  }

</script>


<div id="container">
  <div>
    <div id="score">
      <span><b>{data.score}</b></span> 
      <span>/ 10 점</span>
    </div>
    <div id="date">
      <span></span>
      -
      <span></span>
      <span> 거주자</span>
    </div>
  </div>

  <div id="table">
    <div>
      <span>동/호</span>
      <span>{data}</span>
      <span>남향</span>
      <span></span>
      <span>원룸</span>
      <span></span>
    </div>
    <div>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="description">
    
  </div>

  <div id="estimate">
    <div>
      <span class="index"></span>
      <div class="value">
        <span class:value_off="{true}"></span>

      </div>
    </div>
  </div>

  <div id="image">
    
  </div>
</div>


<style>

#container{
  display: block;
  width: 560px;
  min-height: 900px;
  padding: 20px 5px;
  padding-bottom: 30px;
  border-radius: 15px;

  background-color: white;
}

#score {
  display: inline-block;
}

#date {
  display: inline-block;
  float: right;
}

#description {
  display: block;
  width: 540px;
  min-height: 150px;
  padding: 5px;
  margin: 0 auto;
  border: solid 1px var(--toad-color-2);
}


.on {
  color: black;
}

.value_off {
  color: grey;
  font-weight: 500;
}

</style>