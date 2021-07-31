<script>
  import { onMount } from 'svelte';
  import Naver_login from '../components/Naver_login.svelte';

  let log;

  $: console.log(log);

    const loginWithKakao=()=> {
        Kakao.Auth.login({
          success: function(authObj) {
            log = authObj;
            alert(JSON.stringify(authObj));
          },
          fail: function(err) {
            alert(JSON.stringify(err))
          },
        });
        console.log(Kakao.API.request({
          url:'/v2/user/me'
        }));
      };

  const kakaoLogout=()=> {
    if (!Kakao.Auth.getAccessToken()) {
      alert('Not logged in.')
      return
    }
    Kakao.Auth.logout(function() {
      alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
    })
  };

  const loginFormWithKakao=()=> {
    Kakao.Auth.loginForm({
      success: function(authObj) {
        showResult(JSON.stringify(authObj))
      },
      fail: function(err) {
        showResult(JSON.stringify(err))
      },
    })
  }
  const showResult=(result)=> {
    document.getElementById('reauthenticate-popup-result').innerText = result
  }

  onMount( async ()=> {
    console.log('pp');
    Kakao.init('499d6b17d23452a16f3670dec014b121');
    console.log(Kakao.isInitialized());

  })
</script>

<main>
  <div>{log}</div>
  <a id="custom-login-btn"  on:click={loginWithKakao}>
    <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="222"/>
  </a>
  <br>
  <input type="button" value="logout" on:click={kakaoLogout} >
  <br>
    <a id="reauthenticate-popup-btn" on:click={loginFormWithKakao}>
    <img
      src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
      width="222"
    />
  </a>

<br>

<button class="api-btn" onclick="unlinkApp()">앱 탈퇴하기</button>

<br>
  <!-- 네이버아이디로로그인 버튼 노출 영역 -->
  <div id="naver_id_login"></div>
  <br>
  <Naver_login/>
  <!-- //네이버아이디로로그인 버튼 노출 영역 -->
  <script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charset="utf-8"></script>
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script type="text/javascript">
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
  </script>

<script type="text/javascript">
  function unlinkApp() {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(res) {
        alert('success: ' + JSON.stringify(res))
      },
      fail: function(err) {
        alert('fail: ' + JSON.stringify(err))
      },
    })
  }
</script>


  <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.js"></script>


</main>


<style>
  

</style>