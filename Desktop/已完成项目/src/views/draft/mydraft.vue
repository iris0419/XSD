<template>
    <el-table  style="width: 100%">
      <el-table-column type="selection" />
      <el-table-column label="合同编号"/>
      <el-table-column  label="合同类型"/>
      <el-table-column label="合同名称"/>
      <el-table-column  label="甲方/乙方" />
      <el-table-column  label="创建时间"/>
       
      <el-table-column label="操作" >
        <el-button
          link
          type="primary"
          size="small"
        >
          编辑
        </el-button>

        <el-button
          link
          type="primary"
          size="small"
        >
          删除
        </el-button>

        <el-button
          link
          type="primary"
          size="small"
        >
          提交
        </el-button>
      </el-table-column>
   

    </el-table>
  </template>
  
  <script lang="ts" setup>
  import { ElTable } from 'element-plus'
  
//   interface User {
//     date: string
//     name: string
//     address: string
//   }
//   const tableData: User[] = [
//     {
//       date: '2016-05-04',
//       name: 'Aleyna Kutzner',
//       address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
//     },
//     {
//       date: '2016-05-03',
//       name: 'Helen Jacobi',
//       address: '760 A Street, South Frankfield, Illinois',
//     },
//     {
//       date: '2016-05-02',
//       name: 'Brandon Deckert',
//       address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
//     },
//     {
//       date: '2016-05-01',
//       name: 'Margie Smith',
//       address: '23618 Windsor Drive, West Ricardoview, Idaho',
//     },
//   ]

  
  </script>