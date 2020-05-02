<template>
	<el-container>
		<el-header>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1">后台管理</el-menu-item>
				<el-submenu index="2">
					<template slot="title">个人中心</template>
					<el-menu-item index="2-1">
						<router-link to="/userinfo">个人资料</router-link>
					</el-menu-item>
					<el-menu-item index="2-2">我的博客</el-menu-item>
					<el-menu-item index="2-3">我的标签</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">管理博客</template>
					<el-menu-item index="3-1">文章管理</el-menu-item>
					<el-menu-item index="3-2"><router-link to="/markdown">Markdown编辑器</router-link></el-menu-item>
					<el-menu-item index="3-3">评论管理</el-menu-item>
					<el-menu-item index="3-4">分类专栏</el-menu-item>
				</el-submenu>

			</el-menu>
			<div class="line"></div>
		</el-header>
		<el-container>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<style>
	<style>.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	body>.el-container {
		margin-bottom: 40px;
	}
</style>
<script>
	export default {
		name: "HomeBlog",
		data() {
			return {

			};
		},
		created() {

		},
		methods: {}
	};
</script>
