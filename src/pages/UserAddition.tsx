import MainLayout from "../layout/MainLayout";
import { Card, Form, Input, Button, Typography, message, Select} from "antd";
import { userAddition } from "../api/useraddition";
import {useState} from 'react';


export default function AddUser(){

   const senderCredentialMutate = userAddition();
   const[frontendMessage,setFrontEndMessage]= useState(null);
   const[form] = Form.useForm()

   const submit = async (values: { name: string; email: string; password:string;role:string }) => {
    try{

        const res = await senderCredentialMutate.mutateAsync(values);
        //alert (res.message)
        setFrontEndMessage(res.message);
        form.resetFields();
        

    } 
    
    catch{

        message.error("Failed to add sender credentials");
    }
    
  };



return <MainLayout>
    <Typography.Title level={1} align="center">Add User</Typography.Title>
    <Card style={{ width: 600, margin: "100px auto" }}>
        <Typography.Title level={3} align="center">Fill User Details</Typography.Title>
        
            <Form layout="vertical" onFinish={submit} form={form}>
                
                <Form.Item name="name" rules={[{required: true }]} label="Name">
                    <Input placeholder="Sender Email Id" />
                </Form.Item>
                <Form.Item name="email" rules={[{required: true,type:"email" }]} label="Email">
                    <Input placeholder="Sender Email Id" />
                </Form.Item>
                <Form.Item name="password" rules={[{required: true }]} label="Password">
                    <Input placeholder="Sender Email Id" />
                </Form.Item>
                <Form.Item name="role" rules={[{required: true }]} label="Role">
                    <Select
                            
                            style={{ width: 400 }}
                            allowClear
                            options={
                                      [
                                        { 
                                          value: 'ADMIN', 
                                          label: 'Administrator' 
                                        },
                                        { 
                                          value: 'MANAGER', 
                                          label: 'Sales & Marketing Manager' 
                                        },
                                        { 
                                          value: 'USER', 
                                          label: 'Sales & Marketing User' 
                                        },
                                      ]
                                    }
                            placeholder="select it"
                            
                            />
                </Form.Item>
                
                <Button type="primary" htmlType="submit" style={{display:"block",margin:"0 auto"}}>
                Submit
                </Button>

                
                

            </Form>

        

    </Card>
</MainLayout>


};