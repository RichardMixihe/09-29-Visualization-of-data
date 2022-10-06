
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
  console.log(res)
})




//---------------------------折线图：全学科薪资走势
    // 1.得有盒子（页面布局中已经有了id='line'）
    // 2.引入echarts.min.js
    function lineChart() {
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

    lineChart();









//---------------------------饼图：班级平均薪资
function classSalaryChart() {
    
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

classSalaryChart();



//---------------------------柱状图：班级每组薪资
function histogram() {
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
histogram();








//---------------------------饼图：全学科薪资走势
function salary() {
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
salary()
//---------------------------地图：

function mapChart() {
    let myChart = echarts.init(document.querySelector('#map'));//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素)

    let option = {
        title:{
            text:'地图',//文本标题
            // 颜色，文字大小位置
            textStyle: {
                // color:'',
                fontSize: 16 ,
            },
            left: 10 ,
            top: 15 ,
        },
        series:[{
            type:'map',
            map:'china',
            itemStyle:{
                areaColor:'#E0FFFF',
                
            }
        }]
    }
    myChart.setOption(option)
}
mapChart();