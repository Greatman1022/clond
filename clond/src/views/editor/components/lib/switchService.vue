<template>
    <div>
        <div class="ui-item">
            <el-tooltip style="margin-left: 10px;margin-bottom:10px">
                <el-switch v-model="value1" on-value="1" off-value="0" @change='change'>
                </el-switch>
            </el-tooltip>
        </div>

        <div class="ui-item" v-if='this.value.show == 1'>
            <label class="ed-set-label">调整头像位置</label>
            <fsize @changeFont="changeIcon" :index=index :value="value.top"></fsize>
        </div>

        <div class="ui-item" v-if="this.value.show == 1">
            <label class="ed-set-label">调整头像宽高</label>
            <fsize @changeFont="changeSize" :index=index :value="value.iconSize"></fsize>
        </div>
    </div>
</template>
<script>
import fsize from './Fsize'
export default {
    name: 'slider',
    props: [
        'value',
        'name',
        'index'
    ],
    data() {
        return {
            value1: this.value.show ? '1' : '0'
        }
    },
    components: {
        fsize
    },
    methods: {
        change(val) {
            var index = this.index
            var value = parseInt(val)
            var name = this.name
            this.$store.commit('updateTxt', { index, name, 'setObject': { 'show': value } })
        },
        changeIcon(val) {
            var index = this.index
            this.value.top = val
            var name = this.name
            var value = this.value
            this.$store.commit('updateTxt', { index, name, value })
        },
        changeSize(val) {
            var index = this.index
            var value = parseInt(val)
            this.value.iconSize = val
            var value = this.value
            this.$store.commit('updateTxt', { index, name, value })
        }
    }
};
</script>
