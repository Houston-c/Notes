```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<style>
    #app {
        width: 250px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        padding: 15px;
        background-color: #F5F5F5;
    }

    .checkItem {
        display: block;
        margin: 5px 0 15px 10px;
    }

    .marginTop10 {
        margin-top: 10px;
    }
</style>

<body>
    <div id="app">
        <el-switch v-model="zgRadio" active-text="按整改状态筛选" active-color="#13ce66" inactive-color="#708090"
            @change="switchChange()">
        </el-switch>
        <el-radio-group v-model="radio" class="marginTop10">
            <div v-for="(label,index) in labelData" :key="index">
                <el-radio class="checkItem" :label="index">{{label}}</el-radio>
            </div>
        </el-radio-group>
        <el-button type="primary" class="marginTop10" @click="shaixuan()">筛选</el-button>
    </div>
</body>
<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
    new Vue({
        el: '#app',
        data() {
            return {
                labelData: ["待整改", "待审核", "已完成", "通过", "驳回"],
                zgRadio: false,
                radio: -1
            }
        },
        watch: {
            radio(newV) {
                if (newV == -1) {
                    this.zgRadio = false;
                } else {
                    this.zgRadio = true;
                }
            }
        },
        computed: {},
        methods: {
            switchChange() {
                this.zgRadio = !this.zgRadio;
                if (this.zgRadio) {
                    this.radio = -1;
                } else {
                    this.radio = 0;
                }
            },
            shaixuan() {
                let that = this;
                let data = {};
                data["zhuangtai"] = that.radio;

                let item = {
                    name: "隐患点"
                };
                console.log(data)
            }
        },
    })
</script>

</html>
```

