<script>


 let reviews = [
	{
		"name": "test-constructionname",
		"address": "test-address",
		"title": "test-title",
		"description": `de la chambre`,
		"term": "~~ ~~",
		"cost": {
			"insure": 500 ,
			"rent": 30 ,
			"manage": 6
		},
		"score" : {
			"total": 0,
			"owner": 0,
			"clean": 0,
			"access": 0,
			"bugs": 0,
			"noise": 0
		}
	}
 ];


</script>



<div class="container">
	<div class="construct">
		<div class="block_info">
			<div class="const_name">
				건물 이름
			</div>
			<div class="const_ad">
				<span class="ad_jibun">지번 주소</span><br>
				<span class="ad_road">도로명 주소 </span>
			</div>
			<div class="block_map">
				지도
			</div>
		</div>
		<div class="reviews">
			{#each reviews as article }

				<div class="article">
					<h2>{article.title}</h2>
					{#if article.cost.insure | article.cost.rent}
						<div class="cost">
							<span class="insure">{article.cost.insure}</span> &nbsp/
							<span class="rent">{article.cost.rent}</span>+<span class="manage">{article.cost.manage}</span>
						</div>
					{/if}
					<div class="board">
						<div class="block_score">
							<span class="total_score">종합점수 {article.score.total} / 10</span><br>
							<div class="scoreboard">
								<span class="score">집주인 <span>{article.score.owner} / 10</span></span>
								<span class="score">청결도 <span>{article.score.clean} / 10</span></span>
								<span class="score">벌레 <span>{article.score.bugs} / 10</span></span>
								<span class="score">소음 <span>{article.score.noise} / 10</span></span>
								<span class="score">주변 편의시설<span>{article.score.access} / 10</span></span>
							</div>
						</div>
						<div class="block_sub">
							<div class="block_img">
								<div class="img_article">사진 </div>
								<span>num pic</span>
							</div>

						</div>
						<br>
						<span>Detail description</span>
						<pre class="descript">{article.description}</pre>
					</div>
				</div>
				<div class="article np">
					<h2>{article.title}</h2>
					{#if article.cost.insure | article.cost.rent}
						<div class="cost">
							<span class="insure">{article.cost.insure}</span> &nbsp/
							<span class="rent">{article.cost.rent}</span>+<span class="manage">{article.cost.manage}</span>
						</div>
					{/if}
					<div class="board">
						<div class="block_score">
							<span class="total_score">종합점수 {article.score.total} / 10</span><br>
							<div class="scoreboard">
								<span class="score">집주인 <span>{article.score.owner} / 10</span></span>
								<span class="score">청결도 <span>{article.score.clean} / 10</span></span>
								<span class="score">벌레 <span>{article.score.bugs} / 10</span></span><br>
								<span class="score">소음 <span>{article.score.noise} / 10</span></span>
								<span class="score">주변 편의시설 <span>{article.score.access} / 10</span></span>
							</div>
						</div>
						<span>Detail description</span>
						<pre class="descript">{article.description}</pre>
					</div>
						
					
				</div>
			{/each}
		</div>
	</div>
	<div class="divide"/>

</div>



<style>

.container {
	display: block;
	width: 1024px;
	min-height: 780px;
	margin: 0 auto;

}


.divide {
	display: block;
	width: 90%;
	margin: 0 auto;
	border-top: solid 1px black;
}

.construct {
	padding: 50px 100px;
	padding-top: 0;

	position: relative;

	

	border: solid 1px green;
}

.article h2 {
	margin-left: 30px;
	font-size: 28px;
}

.cost {
	display: inline-block;
	position: absolute;
	top: 15px;
	right: 80px;
	font-size: 18px;
}


.block_map {
	display: block;
	width: 300px;
	height: 300px;
	
	position: absolute;
	right: 150px;
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
	font-size: 18px;
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
	min-height: 150px;
	height: fit-content;
	margin: 0 auto;


}

.board .block_score {
	display: inline-block;
	vertical-align: top;
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
	display: inline-block;
	width: 280px;
	height: 140px;
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
	min-width: 120px;
	margin-bottom: 20px;
	margin-right: 15px;
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


.board .descript {
	display: block;
	width: 540px;
	min-height: 50px;
	padding: 5px 15px;
	margin: 0 auto;
	vertical-align: middle;




}

</style>