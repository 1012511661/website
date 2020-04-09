<template>
    <div class='doctor-list'>
        <div class="title-swap">
            <span class="title-line left" style=" "></span>
            <h1> 百强名医录</h1>
            <span class="title-line right" style=""></span>
        </div>
        <div class="tabs-wrap">
            <template v-for="(item,index) in tabList">
                <span :class="{'tab':true,'active':activeId===index}" :key="index"
                      @click="onClick(index,item.regionId)">{{item.regionName}}</span>
            </template>
        </div>
        <Row>
            <template v-for="(item,index) in doctorList">
                <Col :xs="12" :sm="6" :md="6" :lg="6">
                    <div class="list-warp" :key="index" @click="goDoctorInfo(item)">
                        <div class="img-cell">
                            <img :src="item.cdSrc||'http://health.people.com.cn/NMediaFile/2019/1121/MAIN201911211553000135939888312.jpg'">
                        </div>
                        <p class="title">
                            <span>姓名：</span>{{item.cdName}}
                        </p>
                        <p class="title">
                            <span>票数：</span>{{item.cdNumber}}
                        </p>
                        <div>
                            <Button type="error" @click="onVote(item.cdId)">投票</Button>
                        </div>
                    </div>
                </Col>
            </template>
        </Row>
        <doctorModal v-model="isShowModal" :id="cdId"></doctorModal>
    </div>
</template>

<script>
    import {GetRegion, GetRegionId} from '../../../../api/web'
    import doctorModal from './docoor-modal'

    export default {
        name: "doctor-list",
        props: {},
        components: {doctorModal},
        data() {
            return {
                doctorList: [],
                tabList: [],
                activeId: 0,
                isShowModal: false,
                cdId: null
            }
        },
        methods: {
            goDoctorInfo(item){
                this.$router.push({
                    name: "DATAINFO",
                    params: {
                        item: item,
                        type:2
                    }
                });
            },
            init() {
                this.getDoctor()
            },
            getDoctor() {
                GetRegion().then(res => {
                    if (res.status) {
                        this.tabList = res.data.dataList|| [];
                        this.getDoctorList(res.data.dataList[0].regionId)
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },
            getDoctorList(id) {
                let params= {
                    pageNum: 1,
                    pageSize: 10000,
                    searchInfo: '',
                    regionId: id
                }
                GetRegionId(params).then(res => {
                    if (res.status) {
                        this.doctorList = res.data.dataList || []
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },
            onClick(index, id) {
                this.activeId = index;
                this.getDoctorList(id)
            },
            onVote(cdId) {
                this.cdId = cdId;
                this.isShowModal = true;
            },
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/custom.less";
    @import "../../../../styles/mixin.less";

    .doctor-list {
        max-width: 1200px;
        margin: 20px auto;

        .title-swap {
            height: 50px;
            line-height: 50px;
            text-align: center;
            position: relative;
            margin-bottom: 10px;

            .title-line {
                position: absolute;
                width: 30%;
                border-top: 1px solid #48cd86;
                top: 25px;
            }

            .left {
                left: 5px;
            }

            .right {
                right: 5px;
            }
        }

        .tabs-wrap {
            display: flex;
            justify-content: space-between;
            flex-wrap:nowrap;
            overflow-x: auto;
            width: 100%;
            text-align: center;
            .tab {
                width: 120px;
                height: 32px;
                border: 1px solid #E1E4E5;
                color: @content-dark-color;
                font-weight: bold;
                .center();
                cursor: pointer;
                flex:1 0 auto;
            }

            .active {
                border-color: @primary-color;
                color: @primary-color;
            }
        }

        .list-warp {
            padding: 10px;
            text-align: center;

            .img-cell {
                img {
                    width: 150px;
                    height: 185px;
                    object-fit: initial;
                }

                .title {
                    padding: 10px 0;
                }

            }
        }
    }
</style>