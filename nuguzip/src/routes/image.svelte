<script>
  import Image from '../components/Image.svelte';

  let  avatar, fileinput;
  
  let data 

  const onFileSelected =(e)=>{
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      avatar = e.target.result;
      data = image;
    };
  };
  
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', data)
    console.log(data);
    if (avatar) {
      fetch('upload', {
        method: 'POST',
        body: formData,
        headers: { 
          'Accept-post': 'multipart/form-data',
          'Accept': 'multipart/form-data'},
      }).then((res) => {
        res.text().then((text)=>{
          console.log(text);
          inputs = [...inputs, text];
          let avatar, fileinput;
          });
      });
    }
    else {
      window.alert('image input needed');
    }
  }

 
  let inputs = [];


</script>
<div id="app">
  <h1>Upload Image</h1>  
  {#if avatar}
    <div class="avatar" style="background-image: url({avatar}); background-size: contain; background-repeat: no-repeat;" alt="d" />
  {:else}
    <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
  {/if}
  <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
  <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
  <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
  <br>
  <input type="button" value="post"  on:click={handleSubmit}>
  <br>

  <div style="border: solid 1px blue; padding: 5px;">
    {#each inputs as ipt }
      <Image src={ipt}/>
    {/each}
  </div>
</div>
<style>
  #app{
  display:flex;
    align-items:center;
    justify-content:center;
    flex-flow:column;
}

  .chan {
    cursor: pointer;
  }
 
  .upload{
    display:flex;
  height:50px;
    width:50px;
    cursor:pointer;
  }
  .avatar{
    display:flex;
    height:200px;
    width:200px;
  }
</style>

