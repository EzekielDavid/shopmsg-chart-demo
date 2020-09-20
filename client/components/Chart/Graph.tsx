import React, { Fragment } from 'react';  
import ReactEcharts from "echarts-for-react";
import _ from 'lodash';
import {  Card } from 'antd'; 
import {  DashboardContextConsumer } from '../../context/context'; 

const Graph =() =>{ 
  return (
    <Fragment>    
        <DashboardContextConsumer>
          {({ value }) => { 
            //clone deep object w/o reference
            let dataValue = _.cloneDeep(value)

            dataValue.series.forEach((element, index) => {
                if(element.visible !== true) { 
                    dataValue.series[index].data.length = 0;
                    let getName= dataValue.series[index].name;  
                    dataValue.legends =  dataValue.legends.filter(item => item !== getName)
                } 
            }); 

            return(
              <Card>
                <ReactEcharts
                  option={ {
                    responsive: true, 
                    grid: [
                        {
                          left: 35, 
                          right: 0},
                    ],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: dataValue.legends,
                        left:'left',
                        icon: 'roundeRect'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dataValue.date
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: dataValue.series
                }}
                />
              </Card>
               )
              }
            }
          </DashboardContextConsumer>
     </Fragment>
    );
  
}
export default Graph;