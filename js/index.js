
// axios({
//   url:'/dashboard',
//   headers:{
//     Authorization:localStorage.getItem('token')
//   }
// }).then((result)=>{
//   console.log(result);
// })




// ------------------------ 发送请求，获取首页需要的统计数据 -------------------
axios.get('/dashboard').then(({ data: res }) => {

  let {overview,year,provinceData,salaryData,groupData} = res.data

  //设置最上面的概览区的数据
  console.log(overview)

  for (const key in overview) {
  document.querySelector(`[name=${key}]`).innerHTML = overview[key];

  }
  // 调用函数
  lineChart(year);                //折线图
  classSalaryChart(salaryData);   //饼图
  histogram(groupData);           //柱状图
  salary(salaryData)              //折线图
  mapChart(provinceData);         //地图

})




//---------------------------折线图：全学科薪资走势
    // 1.得有盒子（页面布局中已经有了id='line'）
    // 2.引入echarts.min.js
    function lineChart(data) {
         // 3.初始化echarts
    let myChart = echarts.init(document.querySelector('#line'))
    // 4.配置项
    option = {
        //标题配置
        title:{
            text:'2022全学科薪资走势',//文本标题
            // 颜色，文字大小位置
            textStyle: {
                // color:'',
                fontSize: 16 ,
            },
            left: 10 ,
            top: 15 ,
        },
        xAxis: {
          type: 'category',
          data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            //   x轴上的文字 
            axisLabel:{
                color:'#999'
            },
            axisLine:{
                lineStyle:{
                    color:'#ccc',
                    type:'dashed'
                },
            },
        },

        yAxis: {
          type: 'value',
          //Y轴分割线
          splitLine: {
            lineStyle: {
                type:'dashed'
            }
        }
        },

        //鼠标移入提示
        tooltip:{
            trigger:'axis'
        },
        grid:{
            //  距离顶部：20%
            top:'20%',
        },
        color:{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#499FEE' // 0% 处的颜色
            }, {
                offset: 1, color: '#5D75F0' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        series: [
          {
            
            data: [9000, 12000, 15000, 13000, 10000, 18000, 14000, 10000, 12000, 13000, 15000, 19000],
            type: 'line',
            //  平滑曲线
            smooth: true,
            lineStyle :{
                //  线条粗细：6
                width:6
            },
            // 拐点空心圆：10
            symbolSize:10,
            areaStyle: {
                color: {
                    type: 'linear', // 表示线性渐变
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#499FEE' // 0% 处的颜色
                      },
                      {
                        offset: 0.8,
                        color: 'rgba(255,255,255,0.2)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(255,255,255,0)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false。一般都不需要修改。（如果是true，则哪些数字0/1等等表示真实的像素值了）
                  }
            }
          },
          
        ]
      };
    // 5.创建图表
    myChart.setOption(option)

    }
//---------------------------饼图：班级平均薪资
function classSalaryChart(data) {
    
    //id="salary"
    let myChart = echarts.init(document.querySelector('#salary'));//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素)
    let option = {
        title:{
            text:'班级薪资分布',//文本标题
            // 颜色，文字大小位置
            textStyle: {
                // color:'',
                fontSize: 16 ,
            },
            left: 10 ,
            top: 15 ,
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '6%',
          left: 'center'
        },
        series: [
          {
            color:  ['#FDA224', '#5097FF', '#3ABCFA', '#34D39A'],
            name: '班级薪资分布',//
            type: 'pie',//表示饼图
            center:['50%','50%'],//中心点坐标
            radius: ['50%', '64%'],
            // avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,//圆角
              borderColor: '#fff',//边框颜色
              borderWidth: 2//边框大小
            },
            label: {
              show: false,//每个扇形的描述文字不显示
              position: 'center'
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: '40',
            //     fontWeight: 'bold'
            //   }
            // },
            labelLine: {
                // 视觉引导线
              show: false
            },
            data: [
              { value: 1048, name: '一万以下' },
              { value: 235, name: '1-1.5万' },
              { value: 580, name: '1.5-2万' },
              { value: 484, name: '2万以上' },
            ]
          }
        ]
      };
    myChart.setOption(option)
}
//---------------------------柱状图：班级每组薪资
function histogram(data) {
  let myChart = echarts.init(document.querySelector('#lines'));//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素)

  option = {
    grid:{
      left:70,
      top:30,
      right:30,
      bottom:50,
      
    },
    xAxis: {
      color:'#ccc',
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine:{
        lineStyle:{
           type:'dashed',
        },
      },
      axisLabel: {
          color: '#999'
        },
    
    },
    yAxis: {
      type: 'value',
      splitLine:{
        lineStyle:{
          type:'dashed'
        }
      }
    },
    color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#34D39A' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(52,211,154,0.2)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#499FEE' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(73,159,238,0.2)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      ],
    series: [
      
      {
        data: [12200, 17932, 13901, 13934, 21290, 23300, 13300, 13320],
        type: 'bar',
        name: '期望薪资'
      },
      
      {
        data: [22820, 19932, 16901, 15934, 31290, 13300, 14300, 18320],
        type: 'bar',
        name: '就业薪资'
      }
    ],
    tooltip: {},
  };
  myChart.setOption(option)
}
//---------------------------饼图：全学科薪资走势
function salary(data) {
  let myChart = echarts.init(document.querySelector('#gender'));//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素)
  let option ={

      title:[
        {
            text: '男女薪资分布',
            left: 10, // 10 表示10px
            top: 10,
            textStyle: {
              fontSize: 16
            }
          },
          {
            text: '男生',
            left: '48%', // 10 表示10px
            top: '50%',
            textStyle: {
              fontSize: 12
            }
          },
          {
            text: '女生',
            left: '48%', // 10 表示10px
            top: '95%',
            textStyle: {
              fontSize: 12
            }
          }
          ],
          color: ['#FDA224', '#5097FF', '#3ABCFA', '#34D39A'],
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   top: '5%',
      //   left: 'center'
      // },
      series: [
        {
          name: '男生薪资分布',

          type: 'pie',
          center: ['50%', '30%'],
          radius: ['20%', '40%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            // position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              // fontSize: '40',
              fontWeight: 'bold'
            }
          },
          // labelLine: {
          //   show: false
          // },
          data: [
            { value: 1048, name: '1万以下' },
            { value: 235, name: '1万-2万' },
            { value: 580, name: '1.5万-2万' },
            { value: 484, name: '2万以上' }
          ],
        },
        {
          name: '女生工资分布',
          type: 'pie',
          radius: ['20%', '40%'],
          center: ['50%', '75%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            // position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              // fontSize: '40',
              fontWeight: 'bold'
            }
          },
          // labelLine: {
          //   show: true
          // },
          data: [
            { value: 1048, name: '1万以下' },
          { value: 235, name: '1万-2万' },
          { value: 580, name: '1.5万-2万' },
          { value: 484, name: '2万以上' }
          ],
        }
      ]

  }
  myChart.setOption(option)
}
//---------------------------地图：
// --------------------------- 地图：籍贯分布 --------------------------------
const mapChart = (data) => {
  const mapData = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 3 },
    { name: '天津', value: 2 },
    { name: '上海', value: 4 },
    { name: '重庆', value: 1 },
    { name: '河北', value: 20 },
    { name: '河南', value: 23 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 15 },
    { name: '黑龙江', value: 12 },
    { name: '湖南', value: 2 },
    { name: '安徽', value: 5 },
    { name: '山东', value: 18 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 5 },
    { name: '浙江', value: 1 },
    { name: '江西', value: 4 },
    { name: '湖北', value: 3 },
    { name: '广西', value: 2 },
    { name: '甘肃', value: 9 },
    { name: '山西', value: 11 },
    { name: '内蒙古', value: 14 },
    { name: '陕西', value: 14 },
    { name: '吉林', value: 10 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 3 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 1 },
    { name: '宁夏', value: 1 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 }
  ]
  let myChart = echarts.init(document.querySelector('#map'))
  let option = {
    // 视觉映射组件
    visualMap: {
      type: 'continuous', // continuous表示连续型； piecewise表示分段式
      min: 0,
      max: 20, // 看每个地区的学员多少，再来决定
      inRange: {
        color: ['#fff', '#0075F0']
      },
      text: [20, 0], // 两端的文字
      left: 40,
      bottom: 20
    },
    // 标题配置
    title: {
      text: '籍贯分布',
      top: 15,
      left: 10,
      textStyle: {
        fontSize: 16
      }
    },
    // 肯定需要配置的有：series
    series: [
      {
        name: '籍贯分布', // 添加系列数据的名字（和鼠标移入的提示有关系）
        type: 'map',
        map: 'china', // 具体是什么地图
        // 显示文本标签（每个区域、每个省的名字）
        label: {
          show: true,
          color: 'rgba(0, 0, 0, 0.7)',
          fontSize: 10
        },
        // 每个区域（省）【默认】的样式
        itemStyle: {
          areaColor: '#E0FFFF',
          borderColor: 'rgba(0, 0, 0, 0.2)'
        },
        // 高亮状态，每个区域的配置
        emphasis: {
          // 高亮状态下（鼠标移入状态，或者选中状态下）
          itemStyle: {
            areaColor: '#34D39A',
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        // 每个区域的数据
        data: mapData
      }
    ],
    // 鼠标移入的提示
    tooltip: {
      formatter: '{b}：{c}位学员', // {a}是series里面大的name；{b}表示每个区域的名字(省的名字)；{c}表示该地区的值
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: 'transparent',
      textStyle: {
        color: '#fff'
      }
    }
  }
  myChart.setOption(option)
}