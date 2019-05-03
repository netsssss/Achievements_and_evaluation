<template>
  <div class="add">
    <el-dialog title="添加" :visible.sync="isShow" @close="this.handleClose">
      <el-form ref="add" :model="add" label-position="right" label-width="80px">
        <el-form-item :label="type == 'student' ? '学号' : '教工号'" prop="no">
          <el-input v-model="add.no"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" v-if="type == 'student'">
          <el-select v-model="add.sex" placeholder="性别" style="width:100%;">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="add.tel"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major" v-if="type == 'student'">
          <el-select v-model="add.major" placeholder="专业" style="width:100%;">
            <el-option label="软件工程" value="ruanjiangongcheng"></el-option>
            <el-option label="工商管理" value="gongshangguanli"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="办公地点" prop="addr" v-if="type == 'teacher'">
          <el-select v-model="add.addr" placeholder="办公地点" style="width:100%;">
            <el-option label="一教" value="yijiao"></el-option>
            <el-option label="二教" value="erjiao"></el-option>
            <el-option label="三教" value="sanjiao"></el-option>
            <el-option label="艺术楼" value="yishulou"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="办公室" prop="room" v-if="add.addr">
          <el-input v-model="add.room"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className" v-if="type == 'student' && add.no.length > 3">
          <el-select v-model="add.className" placeholder="班级" style="width:100%;">
            <el-option
              :label="add.no.substr(2,2)+'0'+item"
              v-for="(item, index) in 5"
              :key="index"
              :value="add.no.substr(0,2)+'0'+item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.handleClose">取 消</el-button>
        <el-button type="primary" @click="this.handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    type: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      add: {
        no: "",
        name: "",
        sex: "",
        tel: "",
        major: "",
        addr: "",
        room: "",
        className: ""
      }
    };
  },
  computed: {
    isShow: {
      get() {
        return this.show;
      },
      set() {}
    }
  },
  methods: {
    handleClose() {
      this.$refs["add"].resetFields();
      this.$emit("addClose");
    }
  }
};
</script>
