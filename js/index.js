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









//---------------------------饼图：全学科薪资走势
//---------------------------饼图：全学科薪资走势