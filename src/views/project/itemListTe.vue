<template>

	<section>
  
   
		<!--工具条-->
		 <el-row>
			 	  
			
			<el-col :span="24" class="toolbar" style="padding-top: 8px;">
			   
				<el-form :inline="true">
			 
					<li class="li-tab" v-for="(item,index) in typeParam"
							:key="index"
							@click="getProjectList(item.statCode,index)"
							:class="{active:index===isActive}">{{item.statValue}} {{item.pcount}}
					</li>
				 
				 
					<el-form-item>
						<el-input v-model="filters.name" placeholder="请输入项目名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="searchProjectList()">查询</el-button>
					</el-form-item>
				
				</el-form>
			</el-col>
		 </el-row>
            <el-row >   
					<el-col style="text-align:center;"  v-if="total==0" >
					<p>查询数据不存在！</p>
				</el-col>  
           <el-card :body-style="{ padding: '20px 0px 0px 20px' }" v-for='item in ProjectList' :key='item.id'  v-loading="listLoading" shadow="hover" class="item_card">
			<!--列表-->
			 <el-col :span="9" >
			 <el-col style="padding-bottom:33px;"  class="list_name_2" >
				 <router-link :to="`/itemDetail/${item.id}`">{{item.name}}</router-link>
			   	<!-- <el-button  type="text"  class="list_name_2" v-on:click="detail(item.id)">{{item.name}}</el-button> -->
			</el-col>
			<el-col class="list_item">
				<span>
					项目编号：{{item.code}}
					<!-- <img v-if="scope.row.avatar" class="user-avatar" style="width: 20px; height: 20px; border-radius: 50%;" :src="scope.row.avatar+'?imageView2/1/w/20/h/20'"> {{scope.row.username}} -->
				</span>
			</el-col>
      
	 		<el-col class="list_item">
				<span>
					项目类型：{{item.type_name}}
				</span>
			</el-col>
			<el-col  class="list_item">
				<span>
					负责人：{{item.leader}}
				</span>
			</el-col>

				<el-col  class="list_bottom">
				<span>
					{{item.publishDay}}
				</span>
			</el-col>
	 </el-col>
	 <el-col :span="7" class="list_img"  align="left" v-bind:style="{backgroundImage:'url(' + priorityToUrl(item.priority_name) + ')'}" >
			<el-col :span="10">
				<el-col  class="list_middle_1">
					<span>
						当前阶段
					</span>
				</el-col>
				<el-col  class="list_middle_2">
					<span>
						{{item.stat_name}}
					</span>
				</el-col>
			 
			</el-col>
			<el-col :span="8" class="list_middle_process">
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
					:value="item.process"
					>
					<template slot="center">
						<div class="center">
							<p class="center-num"> {{item.process}}%</p>
						</div>
					</template>
				</circle-process>
 
			</el-col>
	 </el-col>
	<el-col :span="6" class="list_img_next"  align="left" >
		 
				<el-col  class="list_next_process_name">
					<span>
						下一阶段
					</span>
				</el-col>
				<el-col  class="list_next_process_item">
					<span>
						 {{item.next_status}}
					</span>
				</el-col>
			 
		 
	 </el-col>
	 
	 <el-col    class="list_right_img"  style="float:right;"  v-bind:style="{backgroundImage:'url(' + priorityRightToUrl(item.priority_name) + ')'}">
		 
	</el-col>
  </el-card>
   </el-row>
	 

	 <!--工具条-->
		<el-col :span="24" class="toolbar"  v-if="total!==0" >
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="page" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
 
	</section>
</template>

<script>
	 
	import util from '../../common/js/util';
	import CircleProcess from "./CircleProcess.vue";
	//import NProgress from 'nprogress'
	import { getProjectListPage ,getProjecCountByStat} from '../../api/api';
	 
	export default {
		components: {CircleProcess},
		data() {
			return {
				filters: {
					name: ''
				},
				typeParam:[
						{statCode:'',statValue:'全部',pcount:''},
					{statCode:'01',statValue:'项目发起',pcount:''},
					{statCode:'02',statValue:'调研和分析',pcount:''},
					{statCode:'03',statValue:'项目立项',pcount:''},
					{statCode:'04',statValue:'项目开发',pcount:''},
					{statCode:'05',statValue:'项目发布',pcount:''},
					{statCode:'06',statValue:'项目推广',pcount:''}],
				isActive:false,
				circleProcess: {
					svgWidth: 100,
					svgHeight: 100,
					radius: 45,
					circleCx: 50,
					circleCy: 50,
					strokeWidth: 6,
					bgStroke: '#DEDEDE',
					stroke: '#FFFFFF',
					angle: -90,
					direction: true,
					max: 100,
					value: 5
				},
				users: [],
				ProjectList: [],
				total: 0,
				page: 1,
				pageSize:5,
				listLoading: false,
			 	statType:'',
			    index:0,
			 

			}
		},
		methods: {
		 
			 priorityToUrl: function (val) {
				 var gao_img = require('../../assets/gao.png');
				 var zhong_img = require('../../assets/zhong.png');
				 var di_img = require('../../assets/di.png');
                 return val == '高' ? gao_img : val == '中'? zhong_img: val == '低'? di_img:di_img;
			 },
			priorityRightToUrl: function (val) {
				 var gao_img2 = require('../../assets/red.png');
				 var zhong_img2 = require('../../assets/yellow.png');
				 var di_img2 = require('../../assets/green.png');
                 return val == '高' ? gao_img2 : val == '中'? zhong_img2: val == '低'? di_img2:di_img2;
			 },
			handleCurrentChange(val) {
				this.page = val;
				this.searchProjectListByPage();
			},
			
			getProjectList(stat_type,index) {
				this.statType=stat_type;
				this.index=index;
				this.page=1;
				this.filters.name='';
				this.isActive=index;
				let para = {
					page: this.page,
					pageSize:this.pageSize,
					type:'02',
					status:this.statType,
					name:'',
				};
				this.listLoading = true;
				//NProgress.start();
				getProjectListPage(para).then((res) => {
					 
					this.total = res.data.total;
					this.ProjectList = res.data.records;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			searchProjectList() {
			 	this.page=1;
				this.isActive=this.index;
				let para = {
					page: this.page,
					pageSize:this.pageSize,
					type:'02',
					status:this.statType,
					name:this.filters.name,
				};
				this.listLoading = true;
				//NProgress.start();
				getProjectListPage(para).then((res) => {
				//	console.log(res);
					this.total = res.data.total;
					this.ProjectList = res.data.records;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			searchProjectListByPage() {
			 	//this.page=1;
				this.isActive=this.index;
				let para = {
					page: this.page,
					pageSize:this.pageSize,
					type:'02',
					status:this.statType,
					name:this.filters.name,
				};
				this.listLoading = true;
				//NProgress.start();
				getProjectListPage(para).then((res) => {
				//	console.log(res);
					this.total = res.data.total;
					this.ProjectList = res.data.records;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			getProjectCount() {
			 
				//this.isActive=this.index;
				let para = {
					
				};
				this.listLoading = true;
				//NProgress.start();
				getProjecCountByStat(para).then((res) => {
				//	console.log(res);
					 let projectCount = res.data;
					 	projectCount.forEach((item) => {
 							if(item.status=='01')
							{
								this.typeParam[1].pcount='('+item.counts+')';
								// this.p1_count='('+item.counts+')';
							}
							else if(item.status=='02')
							{
								this.typeParam[2].pcount='('+item.counts+')';
								// this.p2_count='('+item.counts+')';
							}
							else if(item.status=='03')
							{
								this.typeParam[3].pcount='('+item.counts+')';
								// this.p3_count='('+item.counts+')';
							}
							else if(item.status=='04')
							{
								this.typeParam[4].pcount='('+item.counts+')';
								// this.p4_count='('+item.counts+')';
							}
							else if(item.status=='05')
							{
								this.typeParam[5].pcount='('+item.counts+')';
								// this.p5_count='('+item.counts+')';
							}
							else if(item.status=='06')
							{
								this.typeParam[6].pcount='('+item.counts+')';
								// this.p6_count='('+item.counts+')';
							}

						});
					// this.ProjectList = res.data.records;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			detail(id){
				this.$router.push({path:'/itemDetail',query: { itemid: id}});
			}
			 
		 
		},
		mounted() {
			var stat_type='';
			this.getProjectList(stat_type,0);
			this.getProjectCount();
		}
	}

</script>

 
<style scoped lang="scss">
	@import '~scss_vars';
	.el-button--text{
		width: 85px;
		color: #000;
		background-color: #f2f2f2;
		border-style: none;
		border-color: #f2f2f2;
	}
	.el-button--text:hover{
		background-color: #f2f2f2;
		border-color: #f2f2f2;  
		color:#ff4445;  
	}
	.el-button--text:focus{
		background-color: #f2f2f2;
		border-color: #f2f2f2;
		color:#ff4445;  
	}
	 
	.item_card {
		height: 210px;
        margin-bottom: 20px;
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
		font-size: 30px;
		color: #FFF;
		margin: 0;
	}	
	.list_middle_process {
	  
	   padding-right:20px;
	   padding-top:20px;
    }
   	.list_img_next {
       width:160px;
	   height:160px;
	   margin-left:30px;
	   background-image: url("../../assets/next-icon.png");
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
		//border-bottom:2px #ff4445 solid;
       }
	 
	.li-tab{
        width: 105px;
        height: 40px;
        display:inline-block;
        text-align: left;
		// border:1px #000 solid;
		line-height:40px;
		font-size: 14px;
       }
</style>