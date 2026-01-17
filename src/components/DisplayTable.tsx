import {Table,message} from "antd";
import React,{useState,useEffect} from "react";
import api from "../api/axios";

interface QueryParameter{
  param1:string;
  //define an optional parameter
  param2?:string; 
 }


const DisplayTable:React.FC<QueryParameter> = ({param1, param2}) =>{
  
 interface ColumnArray{
    title: string; 
    dataIndex: string
 }

 
  
  
  const [columns,setColumns] = useState<ColumnArray[]>([]);

  const [dataSource, SetDataSource] = useState([]); 
  
  useEffect(()=>{

    

    api.get('/viewFileList',{params:{filetype:param1}})
           .then((res) => res.data)
           .then((result)=>{
            const resultArray = result || []
            const resultFirstObject = resultArray[0] || []
            const tableColumn = []
            
            for (const columnName in resultFirstObject){
                
                const column = {
                    
                    title:columnName,
                    dataIndex:columnName
                }
                tableColumn.push(column)
            }
            setColumns(tableColumn);
            SetDataSource(result);})
           .catch((err)=>{console.log(err);});

  

  },[]);
  return (
  <div>
    <Table columns={columns} dataSource={dataSource} scroll={{y:500}} rowKey="id"/>
    
  </div>
  )

}

export default DisplayTable;