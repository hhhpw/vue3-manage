<template>
  <el-table :data="dataSource" style="width: 100%">
    <!-- depositOpenTime -->
    <el-table-column prop="depositOpenTime" label="depositOpenTime">
      <template #default="scope">
        {{ moment(scope.row.depositOpenTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </el-table-column>
    <!-- 名称 -->
    <el-table-column prop="name" label="名称"></el-table-column>
    <!-- derivative -->
    <el-table-column prop="derivative" label="derivative">
      <!-- <template #default="scope">
        {{ scope.row.derivative }}
      </template> -->
    </el-table-column>
    <!-- displayOrder -->
    <el-table-column prop="displayOrder" label="displayOrder"></el-table-column>
    <!-- displayScale 小位数 -->
    <el-table-column prop="displayScale" label="displayScale"></el-table-column>
    <!-- dwWhiteList -->
    <el-table-column prop="dwWhiteList" label="dwWhiteList"></el-table-column>
    <!-- iconUrl -->
    <el-table-column prop="iconUrl" label="iconUrl">
      <template #default="scope">
        <img v-if="scope.row.iconUrl" :src="scope.row.iconUrl" style="width:50px;height:50px;" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchList } from '@api/currency.js';
import { onMounted, reactive, toRefs, inject } from 'vue';
export default {
  name: 'Currency',
  setup() {
    const moment = inject('$moment');
    let state = reactive({
      dataSource: [],
    });

    onMounted(() => {
      fetchList().then(res => {
        state.dataSource = res;
      });
    });
    return {
      ...toRefs(state),
      moment,
    };
  },
};
</script>
