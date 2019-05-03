<template>
  <div class="main-teach">
    <el-row>
      <el-col :span="6" style="min-width:382px">
        <el-card shadow="never">
          <div slot="header" style="line-height: 1.5em;">
            <span>
              可以评价的课程: 已评
              <span style="color:#67C23A">{{alreadyCount}}</span>门,未评
              <span style="color:#F56C6C">{{notEvaluatedCount}}</span>门
            </span>
          </div>
          <Table
            :tableData="tableData"
            :tableHeader="tableHeader"
            :total="total"
            :colWidth="colWidth"
            :curRow="curRow"
            :canTurn="false"
            :canSelect="false"
            :canClickRow="true"
            @rowCurrentChange="handleRowCurrentChange"
          >
            <el-table-column width="60px" label="状态">
              <template slot-scope="scope">
                <span
                  :class="scope.row.zhuangtai == '提交' ? 'state-green' : 'state-red'"
                >{{scope.row.zhuangtai}}</span>
              </template>
            </el-table-column>
          </Table>
        </el-card>
      </el-col>
      <el-col :span="18" style="max-width:calc(100% - 382px);">
        <el-card shadow="never">
          <div slot="header" style="line-height: 1.5em;">
            <span>评价内容</span>
          </div>
          <span
            style="font-size:14px;"
          >当前评价课程为：{{curCourse}};上课时间：星期二第5-6节{1-12周};星期四第1-2节{1-12周};教学班组成：软件1501;软件1502;网络1501;</span>
          <br>
          <span style="font-size:14px;">评价教师：{{curTeacher}}</span>
          <el-card shadow="never" style="margin-top: 2em;">
            <div slot="header" style="line-height: 1.5em;">
              <span>评价对象</span>
            </div>
            <el-steps direction="vertical" :active="4" style="height:600px;">
              <el-step
                :title="item.title"
                v-for="(item, index) in appraise"
                :key="index"
                icon="el-icon-paperclip"
              >
                <template slot="description">
                  <el-row style="display:flex; align-items:stretch;">
                    <el-col :span="12">
                      <el-card shadow="never">
                        <span style="font-size: 14px;">{{item.desc}}</span>
                      </el-card>
                    </el-col>
                    <el-col :span="12" style="display:flex; align-items:stretch;">
                      <el-card shadow="never" style="width: 100%;">
                        <el-link type="primary" v-if="canAppraise">优秀</el-link>
                        <el-link type="warning" v-if="canAppraise" style="margin-left: 2em;">良好</el-link>
                        <el-link type="info" v-if="canAppraise" style="margin-left: 2em;">一般</el-link>
                        <el-tag
                          :type="appraised[index] == '优秀' ? 'primary' : appraised[index] == '良好' ? 'warning' : 'info'"
                          v-if="!canAppraise"
                        >{{appraised[index]}}</el-tag>
                      </el-card>
                    </el-col>
                  </el-row>
                </template>
              </el-step>
            </el-steps>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { TEACH_HEADER } from "./config";
import Teach from "@/api/teach";
const _teach = new Teach();

export default {
  data() {
    return {
      curCourse: "",
      curTeacher: "",
      curRow: 0,
      alreadyCount: 0,
      notEvaluatedCount: 0,
      canAppraise: true,
      tableData: [],
      tableHeader: TEACH_HEADER,
      total: 0,
      colWidth: {
        zhuangtai: "60px",
        kecheng: "200px",
        jiaoshi: "80px"
      },
      appraise: [
        {
          title: "教学态度",
          desc:
            "治学严谨，为人师表，不随意调停课；备课充分，授课热情，辅导耐心；"
        },
        {
          title: "教学内容",
          desc:
            "内容丰富，及时反映学科动态；条理清晰，逻辑严谨，系统性强；重点突出，难度、深度适宜；"
        },
        {
          title: "教学方法",
          desc:
            "讲课熟练，具有启发性、艺术性，使用普通话；调动学生积极性，鼓励学生参与互动；注重学生能力培养，鼓励创新；熟练使用运用现代化教学手段；"
        },
        {
          title: "教学效果",
          desc:
            "能较好地接受并掌握基础知识；有效扩大知识面，增强了综合知识素养；认识、分析和解决问题的能力得到提高；"
        }
      ],
      appraised: []
    };
  },
  mounted() {
    this.getTeach();
  },
  methods: {
    async getTeach() {
      try {
        let res = await _teach.getTeach();
        if (res.status == 200 && res.data.code && res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.total = parseInt(res.data.total);
          this.tableData.map(item => {
            item.zhuangtai == "提交"
              ? this.alreadyCount++
              : this.notEvaluatedCount++;
          });
        } else {
          this.$message.info({ showClose: true, message: "查询失败" });
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleRowCurrentChange(row) {
      if (row) {
        this.curCourse = row.kecheng;
        this.curTeacher = row.jiaoshi;
        this.canAppraise = row.zhuangtai == "提交" ? false : true;
        this.appraised = row.pingjia.split(",");
      }
    }
  },
  components: {
    Table: () => import("@/components/Table")
  }
};
</script>

<style lang="stylus">
.main-teach {
  .cell {
    font-size: 12px !important;
  }

  .state-green {
    color: #67c23a;
  }

  .state-red {
    color: #F56C6C;
  }

  .el-step__description {
    padding-right: 10% !important;
  }
}
</style>

