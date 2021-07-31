<script>
  import { onMount } from 'svelte'; 


  onMount( async()=>{
    var naver_id_login = new naver_id_login("3drD3UpiyFjeG6w9uCgd", "http://lion124.iptime.org:3000/callback");
    var state = naver_id_login.getUniqState();
    console.log(naver_id_login);
    console.log(state);
    naver_id_login.setButton("white", 2,40);
    naver_id_login.setDomain("http://lion124.iptime.org:3000");
    naver_id_login.setState(state);
    naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();
    console.log(naver_id_login);
  })


</script>

<svelte:head>
  <script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charset="utf-8"></script>
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
  </svelte:head>

<div>
  <div id="naver_id_login"></div>
  <br>

  <!-- //네이버아이디로로그인 버튼 노출 영역 -->

</div>