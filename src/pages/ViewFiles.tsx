import MainLayout from "../layout/MainLayout";
import { Card, Form, Typography} from "antd";
import { Select} from "antd";
import {useState,useEffect} from 'react';
import DisplayTable from "../components/DisplayTable"


export default function ViewFiles(){
    const[form] = Form.useForm();
    const [fileType, setFileType] = useState('')
    const [isSelectionMade, setIsSelectionMade] = useState(false)
    

   

   

    const handleChange = (values:string) =>{
        
        setFileType(values)
        setIsSelectionMade(false)
        
        
        
    }

    useEffect(()=>{
        
        if (fileType !== ''){setIsSelectionMade(true)}
        
        
        
        
    },[handleChange])

    

    return <MainLayout>
        <Typography.Title level={1} align="center">View Uploaded Files</Typography.Title>
        
        <Card style={{ width: '80vw', margin: "80px auto"}}>
            <div style ={{display:'flex',justifyContent:'center'}}>
                <label htmlFor="file-select">File Type:</label>
                <Select
                            id="file-select"
                            style={{ width: 200 }}
                            allowClear
                            onChange={handleChange}
                            options={
                                      [
                                        { 
                                          value: 'customerlist', 
                                          label: 'Customer File' 
                                        },
                                        { 
                                          value: 'htmlformat', 
                                          label: 'Email Template' 
                                        },
                                        { 
                                          value: 'emailbounces', 
                                          label: 'Email Bounces File' 
                                        },
                                      ]
                                    }
                            placeholder="select it"
                            
                            />

            </div>
            
        </Card>
        <Card style={{ width: '80vw', margin: "80px auto"}}>
                <Typography.Title level={3} align="center">Files List</Typography.Title>
                
                {isSelectionMade ? (<DisplayTable param1={fileType}/>) : (<p>Please select an option to view the table.</p>)}
                

            </Card>
        
        
        
    </MainLayout>

}