import React, { Fragment } from 'react'; 
 
import { DatePicker, Card, Switch, Row, Col} from 'antd';

import {DashboardContextConsumer} from '../../context/context'; 
import constants from '../../const/const';
const {RangePicker } = DatePicker;

 class SearchForm extends React.Component { 
    state ={
        switch:{
            optins: true,
            recipients:true
        }
    }

    onChange = (dateString) => { 
        if(!dateString) 
            return null;

        var url_optins:string = "/api/reports/optins.json?";
        var url_recepients:string = "/api/reports/recipients.json?";
        var params = {
            from: dateString[0],
            to: dateString[1]
        };

       return  Promise.all(constants.map(val=>{
           return fetch(val.url+ new URLSearchParams(params)).then(value => value.json())
       })); 
            
    } 
    
    handleSwitch = (checked, name,value, setValue) =>{  
        let obj = value.series.find(x => x.name === name);
        let index = value.series.indexOf(obj);
        value.series.fill(obj.visible=checked, index, index++); 
        setValue(value);
        this.setState(prevState => ({ 
            switch: {
            ...prevState.switch,
            [name]:checked
            }
        })) 
    }

    handleData = (val) =>{
        
        const series =  val.map((currElement, index) => {
            let name = constants[index].name;  
            let data = currElement.map(child =>{ 
                return child.count;
            });
            return {
                name: name,
                symbol: 'none',
                type: 'line',
                smooth: false,
                data: data,
                visible: this.state.switch[name]
            }; //equivalent to list[index]
          });
        
        const date = val[0].map(currElement =>{ 
            return currElement.date;
        })  

        const legends = constants.map(function(val){
            return val.name;
        })

        const returnValue = {
            legends:legends,
            date: date,
            series: series
        } 
        return returnValue;
    }

    render(){
    return (
        <Fragment>   
            <Card> 
                <DashboardContextConsumer>
                    {
                        ({ value, setValue }) => {    
                        return( 
                            <Row > 
                                <Row >
                                    <Col span={4}>Date Range:</Col>
                                    <Col span={8}><RangePicker onChange={ async (date, dateString)=>{
                                        const val = await this.onChange(dateString); 
                                        let processData = this.handleData(val);  
                                        setValue(processData);
                                        }} /> </Col>
                                </Row>
                                {
                                    constants.map(val=>{
                                        return(
                                            <Fragment>
                                                <Row>
                                                    <Col span={4}> Show {val.name.charAt(0).toUpperCase() + val.name.slice(1)}:</Col>
                                                    <Col span={8}><Switch defaultChecked  disabled={value.series.length >0 ?false:true}  onChange={ (e) => this.handleSwitch(e, val.name, value, setValue)}/></Col>
                                                </Row> 
                                            </Fragment>
                                        )
                                    })
                                }
                            </Row>
                    
                        )
                    }
                    }
                </DashboardContextConsumer>
            </Card> 
        </Fragment>
    );
    }
}

export default SearchForm;
