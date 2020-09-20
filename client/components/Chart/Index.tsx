import React from 'react'; 

import {  Row } from 'antd';
import { DashboardProvider } from '../../context/context'; 
import SearchForm from './SearchForm'; 
import Graph from './Graph';  

interface IValue  {
  legends: any;
  date: any;
  series: any;
}
  interface IState  {
    value: IValue;
    setValue: (value:any) => void;
  }
 class Index extends React.Component <any, IState> {
  constructor(props) {
    super(props); 
    this.state = {
      value: {legends:[],date:[], series:[]},
      setValue: this.setValue
    }; 
  }

  setValue = value => { 
    this.setState({ value });
  }; 
   

  render(){
    const { value } = this.state;
    return (
      <DashboardProvider value={this.state}>
        <Row justify="space-between">
          <Row style={{  marginTop: 20 }} >
            <SearchForm/>
          </Row>
          <Row style={{  marginTop: 20 }} >
            <Graph/> 
          </Row>
        </Row>
      </DashboardProvider>
    );
  }

}
 
export default Index;
