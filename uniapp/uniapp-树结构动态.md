```vue
<template>
	<view>
		<view v-for="(item,index) in goujianData" :key="index">
			<view class="tree-item w-100 align-center justify-between">
				<view v-if="item.o_haschild==='true'" class="flex align-center w-100  margin-lr-sm " :style="{paddingLeft:item.o_level? item.o_level*13+'px':''}"
				 @tap="openClick(item,index)">
					<image v-if="!item.fold" :src="openThump" style="width: 25rpx; height: 15rpx;" />
					<image v-else :src="closeThump" style="width: 15rpx;height: 25rpx;" />
					<view class="margin-left-sm text-xl ">{{item.o_projecttaskdesc}}</view>
				</view>
				<!-- 如果没有子构件 -->
				<view v-else class="margin-lr-sm margin-tb-xs text-xl w-100" :style="{paddingLeft:item.o_level? (item.o_level*13+10)+'px':''}"
				 @tap="openClick(item,index)">
					<view class="text-xl ">{{item.o_projecttaskdesc}}</view>
				</view>
				<!-- 如果selectShow为true -->
				<view v-if="selectShow" style="margin-right: 20upx;">
					<uni-icons :type="index == clickIndex-1 ? 'checkmarkempty' : ''" :color="index == clickIndex-1 ? '#007aff' : '#aaa'"
					 size="35" />
				</view>
				<!-- 如果为false，显示跳转详情图标 -->
				<image v-else class="margin-right-sm" src="/static/image/wode_icon_ziliao@2x.png" style="width: 45rpx;height: 40rpx;"
				 @tap="detail(item)"></image>
			</view>
		</view>
		<!-- 选择确认 -->
		<button v-if="selectShow" class="fixBtn" type="primary" @tap="sureClick">确认</button>
	</view>
</template>

<script>
	import {
		getSubList
	} from "@/https/index.js"
	export default {
		props: {
			selectShow: Boolean
		},
		data() {
			return {
				nodeid: 0,
				goujianData: [],
				clickIndex: 0,
				closeThump: "/static/image/link_icon_triangle_default@2x.png",
				openThump: "/static/image/link_icon_triangle_selected@2x.png",
				selectGj: ''
			}
		},
		mounted() {
			this.getData()
		},

		methods: {
			getData() {
				let that = this;
				uni.showLoading({
					title: "加载中"
				})
				getSubList({
					nodeid: this.nodeid
				}).then(res => {
					let reqData = res.content
					let length = reqData.length
					for (let i = length - 1; i > -1; i--) {
						reqData[i]["childNum"] = 0
						reqData[i]["fold"] = true
						reqData[i]["parentIndex"] = that.clickIndex - 1
						if (that.clickIndex < 1) {
							that.goujianData.push(reqData[i])
						} else {
							that.goujianData.splice(that.clickIndex, 0, reqData[i])
						}
					}
					// 首次请求clickIndex为0
					if (that.clickIndex) {
						that.goujianData[that.clickIndex - 1]["childNum"] = length
					}
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				})
			},
			closeItem(item, index, start, num) {
				let that = this
				// 判断是否为叶子节点
				if (item.childNum) {
					num = num + item.childNum
					that.closeItem(that.goujianData[index + 1], index + 1, start, num);
				} else {
					// 如果不是叶子节点则递归，当index = start + num停止
					if (index == start + num) {
						that.goujianData.splice(start + 1, num)
						that.goujianData[start]["childNum"] = 0;
					} else {
						that.closeItem(that.goujianData[index + 1], index + 1, start, num)
					}
				}
			},
			openClick(item, index) {
				let that = this
				that.clickIndex = index + 1
				that.nodeid = item.o_projecttaskno
				item.fold = !item.fold
				if (item.childNum) {
					this.closeItem(item, index, index, 0)
				} else {
					that.getData()
				}
			},
			detail(item) {
				console.log(item)
				uni.navigateTo({
					url: "/pages/goujianDetails/goujianDetails?id=" + encodeURIComponent(JSON.stringify(item.o_projecttaskno))
				})
			},
			sureClick() {
				let that = this
				let curIndex = that.clickIndex - 1
				let parentIndex = that.goujianData[curIndex]["parentIndex"]
				let data = that.goujianData
				let name
				if (parentIndex < 0) {
					name = data[curIndex].o_projecttaskname
				} else {
					name = data[parentIndex].o_projecttaskname + ">" + data[curIndex].o_projecttaskname
				}
				let o_id = data[curIndex].o_id
				that.selectGj = {
					name,
					o_id
				}
				this.$emit("selectD")
			},
			resultData() {
				return this.selectGj
			}
		},
	}
</script>

<style>
	.tree-item {
		display: flex;
		overflow: hidden;
		height: 64upx;
		line-height: 64upx;
		background-color: #FFFFFF;
		/* margin: 0 20rpx; */
		border-bottom: 1rpx solid #D3D3D3;
	}

	.isTrue {
		padding-left: 30upx;
	}

	.fixBtn {
		height: 80upx;
		line-height: 80upx;
		position: fixed;
		right: 50upx;
		bottom: 70upx;
		font-size: 35upx;
	}

	.w-100 {
		width: 100%;
	}

</style>

```

getSubList：http://bim.checc.com.cn/baisha/bimelements/v1/api/Elements/getsublist  post