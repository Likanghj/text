<template>

	<section>
  
   
		<!--工具条-->
		 <el-row>
			<el-col :span="24" class="toolbar" style="padding-left: 0px;">
			
			 
				 
					<span >产品看板 > 产品详情</span>
					 
			  
			</el-col>
		 </el-row>
          <el-card :body-style="{ padding: '20px 0px 0px 20px' }" shadow="hover" class="item_card">
            <el-row>
				<el-col :span="18" class="list_name_2">
						{{Detail.name}}
				</el-col>
				<el-col :span="6"   class="list_right_img"  style="float:right;"  v-bind:style="{backgroundImage:'url(' + priorityRightToUrl(Detail.priority_name) + ')'}">
				
				</el-col>
			</el-row>
			<el-row>
				<el-col class="list_item">
					
						项目编号：{{Detail.code}}
				</el-col>
			 
			</el-row>

				<el-row type="flex">
					<!--项目发起-->
					<el-col :span="3" style="padding-top:50px;">
						<el-col  class="list_item">项目发起</el-col>
						<el-col>
							<el-col :span="12" class="process_1"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item">{{stat_1.time_str}}</el-col>
					</el-col>
				 
					<!--调研和分析-->
						
					<el-col  style="padding-top:20px;width:23%;" class="list_item"   v-if="Detail.stat === '02'" >
						<el-col style="width:55%">
					 	 <circle-process
							:svgWidth="circleProcess.svgWidth"
							:svgHeight="circleProcess.svgHeight"
							:radius="circleProcess.radius"
							:circleCx="circleProcess.circleCx"
							:circleCy="circleProcess.circleCy"
							:strokeWidth="circleProcess.strokeWidth"
							:bgStroke="circleProcess.bgStroke"
							:stroke="circleProcess.stroke"
							:angle="circleProcess.angle"
							:direction="circleProcess.direction"
							:max="circleProcess.max"
							:value="Detail.process"
							>
							<template slot="center">
								<div class="center">
									<p>调研和分析</p>
									<p class="center-num"> {{Detail.process}}%</p>
								</div>
							</template>
						</circle-process>
						</el-col>
						<el-col   style="padding-top:60px;width:45%;"> <p  class="process_line_current_right"> </p></el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;"  v-else-if="Detail.stat === '01'">

						<el-col  class="list_item">调研和分析</el-col>
						<el-col>
							<el-col :span="12" class="process_grey"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item"> </el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;" v-else>

						<el-col  class="list_item">调研和分析</el-col>
						<el-col>
							<el-col :span="12" class="process_1"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item">{{stat_2.time_str}}</el-col>
					</el-col>


					<!--项目立项进度条-->

					<el-col :span="6" style="padding-top:20px;" class="list_item"   v-if="Detail.stat === '03'" >
						<el-col :span="13">
					 	 <circle-process
							:svgWidth="circleProcess.svgWidth"
							:svgHeight="circleProcess.svgHeight"
							:radius="circleProcess.radius"
							:circleCx="circleProcess.circleCx"
							:circleCy="circleProcess.circleCy"
							:strokeWidth="circleProcess.strokeWidth"
							:bgStroke="circleProcess.bgStroke"
							:stroke="circleProcess.stroke"
							:angle="circleProcess.angle"
							:direction="circleProcess.direction"
							:max="circleProcess.max"
							:value="Detail.process"
							>
							<template slot="center">
								<div class="center">
									<p>项目立项</p>
									<p class="center-num"> {{Detail.process}}%</p>
								</div>
							</template>
						</circle-process>
						</el-col>
						<el-col :span="11" style="padding-top:60px;"> <p  class="process_line"> </p></el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;"  v-else-if="Detail.stat === '01' || '02'">

						<el-col  class="list_item">项目立项</el-col>
						<el-col  :offset="2">
							<el-col :span="12" class="process_grey"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item"> </el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;" v-else>

						<el-col  class="list_item">项目立项</el-col>
						<el-col>
							<el-col :span="12" class="process_1"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item">{{stat_3.time_str}}</el-col>
					</el-col>
				 <!--项目开发进度条-->
					<el-col :span="6" style="padding-top:20px;" class="list_item"   v-if="Detail.stat === '04'" >
						<el-col :span="13">
					 	 <circle-process
							:svgWidth="circleProcess.svgWidth"
							:svgHeight="circleProcess.svgHeight"
							:radius="circleProcess.radius"
							:circleCx="circleProcess.circleCx"
							:circleCy="circleProcess.circleCy"
							:strokeWidth="circleProcess.strokeWidth"
							:bgStroke="circleProcess.bgStroke"
							:stroke="circleProcess.stroke"
							:angle="circleProcess.angle"
							:direction="circleProcess.direction"
							:max="circleProcess.max"
							:value="Detail.process"
							>
							<template slot="center">
								<div class="center">
									<p>项目开发</p>
									<p class="center-num"> {{Detail.process}}%</p>
								</div>
							</template>
						</circle-process>
						</el-col>
						<el-col :span="11" style="padding-top:60px;"> <p  class="process_line"> </p></el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;"  v-else-if="Detail.stat === '01' || '02' || '03'">

						<el-col  class="list_item">项目开发</el-col>
						<el-col  :offset="2">
							<el-col :span="12" class="process_grey"></el-col>
							<el-col :span="12"  style="margin-right:5px;"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item"> </el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;" v-else>

						<el-col  class="list_item">项目开发</el-col>
						<el-col  :offset="2">
							<el-col :span="12" class="process_1"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item">{{stat_4.time_str}}</el-col>
					</el-col>
 				<!--项目项目发布进度条-->
				<el-col :span="6" style="padding-top:20px;" class="list_item"   v-if="Detail.stat === '05'" >
						<el-col :span="13">
					 	 <circle-process
							:svgWidth="circleProcess.svgWidth"
							:svgHeight="circleProcess.svgHeight"
							:radius="circleProcess.radius"
							:circleCx="circleProcess.circleCx"
							:circleCy="circleProcess.circleCy"
							:strokeWidth="circleProcess.strokeWidth"
							:bgStroke="circleProcess.bgStroke"
							:stroke="circleProcess.stroke"
							:angle="circleProcess.angle"
							:direction="circleProcess.direction"
							:max="circleProcess.max"
							:value="Detail.process"
							>
							<template slot="center">
								<div class="center">
									<p>项目发布</p>
									<p class="center-num"> {{Detail.process}}%</p>
								</div>
							</template>
						</circle-process>
						</el-col>
						<el-col :span="11" style="padding-top:60px;"> <p  class="process_line"> </p></el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;"  v-else-if="Detail.stat === '01' || '02' || '03' || '04'">

						<el-col  class="list_item">项目发布</el-col>
						<el-col  :offset="2"> 
							<el-col :span="12" class="process_grey"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item"> </el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;" v-else>

						<el-col  class="list_item">项目发布</el-col>
						<el-col>
							<el-col :span="12" class="process_1"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item">{{stat_5.time_str}}</el-col>
					</el-col>

					<!-- 项目推广进度条 -->
					 <el-col :span="6" style="padding-top:20px;" class="list_item"   v-if="Detail.stat === '06'" >
						<el-col :span="13">
					 	 <circle-process
							:svgWidth="circleProcess.svgWidth"
							:svgHeight="circleProcess.svgHeight"
							:radius="circleProcess.radius"
							:circleCx="circleProcess.circleCx"
							:circleCy="circleProcess.circleCy"
							:strokeWidth="circleProcess.strokeWidth"
							:bgStroke="circleProcess.bgStroke"
							:stroke="circleProcess.stroke"
							:angle="circleProcess.angle"
							:direction="circleProcess.direction"
							:max="circleProcess.max"
							:value="Detail.process"
							>
							<template slot="center">
								<div class="center">
									<p>项目推广</p>
									<p class="center-num"> {{Detail.process}}%</p>
								</div>
							</template>
						</circle-process>
						</el-col>
						<el-col :span="11" style="padding-top:60px;"> <p  class="process_line"> </p></el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;"  v-else-if="Detail.stat === '01' || '02' || '03' || '04' || '05'">

						<el-col  class="list_item">项目推广</el-col>
						<el-col  :offset="4">
							<el-col :span="12" class="process_grey"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item"> </el-col>
					</el-col>
					<el-col :span="3" style="padding-top:50px;" v-else>

						<el-col  class="list_item">项目推广</el-col>
						<el-col>
							<el-col :span="12" class="process_1"></el-col>
							<el-col :span="12"> <p  class="process_line"> </p></el-col>
						</el-col>
						<el-col  class="list_item">{{stat_6.time_str}}</el-col>
					</el-col>
			</el-row>
		</el-card>
		 
	  	<div class="tabs">
			<li  class="li-tab" v-for="(item,index) in tabsParam"
					:key="index"
					@click="toggleTabs(index)"
					:class="{active:index===nowIndex}">{{item}}
			</li>
		</div>
	 
		<!--切换项组件-->  
		<el-card  v-show="nowIndex===0" >
			
			 
				<el-col class="tabl1">
					<el-col :span="12">项目名称：{{Detail.name}}</el-col>
					<el-col :span="12">项目需求方：{{Detail.owner}}</el-col>
				</el-col>
				<el-col  class="tabl1">
					<el-col :span="12">项目编号：{{Detail.code}}</el-col>
					<el-col :span="12">预计发布日期：{{Detail.publish_str}}</el-col>
				</el-col>
				<el-col class="tabl1" >
					<el-col :span="12">需求方联系人：{{Detail.owner_contact}}</el-col>
					<el-col :span="12">联系电话：{{Detail.owner_phone}}</el-col>
				</el-col>
				<el-col  class="tabl1">
					<el-col :span="12">项目负责人：{{Detail.leader}}</el-col>
					<el-col :span="12">联系电话：{{Detail.ld_phone}}</el-col>
				</el-col>
				<el-col  class="tabl1">
					<el-col>项目概述：</el-col>
					<el-col>{{Detail.description}}</el-col>
				</el-col>
		 	  
		</el-card>
		<el-card v-show="nowIndex===1">
			<el-row style="padding-bottom:20px;">
				<el-col :span="4" class="member-hz">{{meberCount}}人</el-col>
				 
			</el-row>
			<el-row class="tabl2">
				<el-col :span="4">序号</el-col>
				<el-col :span="4">姓名</el-col>
				<el-col :span="4">职位</el-col>
			</el-row>
			<el-row v-for="(member,index) in Detail.members" :key="index" class="tabl2">
				<el-col :span="4">{{++index}}</el-col>
				<el-col :span="4">{{member.name}}</el-col>
				<el-col :span="4">{{member.title}}</el-col>
			</el-row>
		</el-card>
		<el-card v-show="nowIndex===2">
			
			<el-row style="padding-bottom:20px;">
				<el-col :span="4" class="member-hz">项目连接</el-col>
			</el-row>
			<el-row  class="tabl2">
				<el-col class="tg-link">{{Detail.link}}</el-col>
			</el-row>
			<el-row class="tabl2">
				<el-col >项目销售:{{Detail.sales}}</el-col>
			</el-row>
			<el-row class="tabl2">
				<el-col >项目培训:{{Detail.training_name}}</el-col>
			</el-row>
			<el-row class="tabl2">
				<el-col >项目反馈:{{Detail.feedback}}</el-col>
			</el-row>
		</el-card>
 
  
 
	</section>
</template>

<script>
	 
	import util from '../../common/js/util';
 	import CircleProcess from "./CircleProcess.vue";
	//import NProgress from 'nprogress'
	import { getProjectListPage, getProjectDetail} from '../../api/api';
 
	export default {
		 components: {CircleProcess},
		data() {
			return {
			 	circleProcess: {
					svgWidth: 140,
					svgHeight: 140,
					radius: 55,
					circleCx: 70,
					circleCy: 70,
					strokeWidth: 6,
					bgStroke: '#DEDEDE',
					stroke: '#FF4445',
					angle: -90,
					direction: true,
					max: 100,
					value: 5
				},
			 
			    tabsParam:['项目信息','项目成员','项目推广'],
				nowIndex:0,
				isShow:false,
				meberCount:0,
				listLoading: false,
				Detail: [], 
				stat_1:[{stat:"",stat_name:"",time_str:""}],
				stat_2:[{stat:"",stat_name:"",time_str:""}],
				stat_3:[{stat:"",stat_name:"",time_str:""}],
				stat_4:[{stat:"",stat_name:"",time_str:""}],
				stat_5:[{stat:"",stat_name:"",time_str:""}],
				stat_6:[{stat:"",stat_name:"",time_str:""}],
				ItemId:"",
			 	items:[{title:'开单',description:'111'},{title:'待付款',description:''},{title:'完成',description:''}]
				 

			}
		},
		methods: {
			priorityRightToUrl: function (val) {
				 var gao_img2 = require('../../assets/red.png');
				 var zhong_img2 = require('../../assets/yellow.png');
				 var di_img2 = require('../../assets/green.png');
                 return val == '高' ? gao_img2 : val == '中'? zhong_img2: val == '低'? di_img2:di_img2;
			 },
			  //切换tab项
             toggleTabs(index){
                 this.nowIndex = index;
               //  $(window).resize();
            },
			getDetails() {
				let itemid=this.$route.params.id;
				let para = {
					id: itemid,
				};
			 
				this.listLoading = true;
				//NProgress.start();
				getProjectDetail(para).then((res) => {
					 
					this.Detail = res.data;
					this.meberCount=res.data.members.length;
					let statusHistory=res.data.statusHistory;
					statusHistory.forEach((item) => {
					 if(item.stat=='01')
					 {
						this.stat_1={stat:item.stat,stat_name:item.stat_name,time_str:item.time_str};
					 }
					 else if(item.stat=='02')
					 {
						this.stat_2={stat:item.stat,stat_name:item.stat_name,time_str:item.time_str};
					 }
					  else if(item.stat=='03')
					 {
						this.stat_3={stat:item.stat,stat_name:item.stat_name,time_str:item.time_str};
					 }
					  else if(item.stat=='04')
					 {
						this.stat_4={stat:item.stat,stat_name:item.stat_name,time_str:item.time_str};
					 }
					  else if(item.stat=='05')
					 {
						this.stat_5={stat:item.stat,stat_name:item.stat_name,time_str:item.time_str};
					 }
					   else if(item.stat=='06')
					 {
						this.stat_6={stat:item.stat,stat_name:item.stat_name,time_str:item.time_str};
					 }
				 
					});

					this.listLoading = false;
					//NProgress.done();
				});
			},
		 
		 
		 
		},
	created(){
	 
        this.getDetails()
      },
	}

</script>

 
<style scoped lang="scss">
	@import '~scss_vars';
	.el-button--text{
		width: 85px;
		color: #000;
		background-color: #F5f5f5;
		border-style: none;
		border-color: #F5f5f5;
	}
	.el-button--text:hover{
		background-color: #F5f5f5;
		border-color: #F5f5f5;  
		color:#ff4445;  
	}
	.el-button--text:focus{
		background-color: #F5f5f5;
		border-color: #F5f5f5;
		color:#ff4445;  
	}
	 
	.item_card {
	 
		// height: 250px;
        margin-bottom: 0px;
    }
	 
 	.list_name {
       font-size: 16px;
	   font-weight: bold;
	   padding-bottom:33px;
    }
	 
 	.list_name_2 {
       font-size: 16px;
	   height: 30px;
	   font-weight: bold;
	   background-color: #FFF;
	  
    }
	.list_item {
	   color:#363330;
       font-size: 14px;
	   padding-bottom:12px;
    }

	.list_bottom {
       font-size: 14px;
	   font-weight: bold;
	   padding-top:10px;
    }
	.list_img {
       width:320px;
	   height:160px;
	    padding-top:10px;
    }
	.list_middle_1 {
	   color:#fff;
       font-size: 14px;
	   padding-top:20px;
	   padding-bottom:28px;
	   padding-left:20px;
    }
	.list_middle_2 {
	   color:#fff;
       font-size: 18px;
	   font-weight: bold;
	   padding-left:20px;
	   padding-bottom:12px;
    }
   
 	.circle-process {
    margin: 0 auto;
	}
	.center .center-num {
		font-size: 25px;
		color: #ff4445;
		margin: 0;
	}	
	.list_middle_process {
	  
	   padding-right:20px;
	   padding-top:20px;
    }
   	.process_1 {
       width:30px;
	   height:30px;
	   background-image: url("../../assets/press_green.png");
    }
	.process_grey {
       width:30px;
	   height:30px;
	   background-image: url("../../assets/press_grey.png");
    }
	.process_line {
		float: left;
	 	margin-left:2px;
		background-color: #bbb5b5;
		width:105px;
	   height:5px;
	  // border:5px solid #141313;
    }
	.process_line_current_right {
		float: left;
	 	margin-left:0px;
		background-color: #bbb5b5;
		width:105px;
	   height:5px;
	  // border:5px solid #141313;
    }
	.list_next_process_name {
       font-size: 14px;
	   font-weight: bold;
	   padding-top:33px;
	   padding-left:20px;
    }

	.list_next_process_item {
	   color:#363330;
       font-size: 18px;
	   font-weight: bold;
	   padding-top:20px;
	   padding-left:20px;
    }
	.list_right_img {
	 
       width:60px;
	   height:32px; 
    }
	.active{
        background: #f2f2f2;
		font-size: 14px;
		font-weight: bold;
		color: #ff4445;
		border-bottom:2px #ff4445 solid;
       }
	.tabs
	 {
        width: 100%;
        height: 40px;
        font:0;
        padding:0;
		background: #f2f2f2;
		padding-top:20px;
		padding-bottom: 2px;
	 
    }
	.li-tab{
        width: 120px;
        height: 40px;
        display:inline-block;
        text-align: left;
		// border:1px #000 solid;
		line-height:40px;
		font-size: 14px;
       }
	.tabl1{
		line-height: 35px;
	}
	.tabl2{
		line-height: 25px;
	}
	.member-hz
	{
		font-size: 30px;
		font-weight: bold;
	}
	.tg-link
	{
		font-size: 14px;
		color:#ff4445;
		 
	}
	// .li-tab.active{background:red;color:rgb(151, 146, 146)}
</style>