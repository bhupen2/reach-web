import MainLayout from "../layout/MainLayout";
import { Card, Form, Input, Button, Typography, message, Col,Row } from "antd";
import { senderCredential } from "../api/sendercredentials";
import {useState} from 'react';


export default function SenderCredential() {
  const senderCredentialMutate = senderCredential();
  const[frontendMessage,setFrontEndMessage]= useState(null);
  const[form] = Form.useForm()
  

  

  const submit = async (values: { senderEmail: string; password: string; smtpServer:string;port:string }) => {

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
    <Typography.Title level={1} align="center">Add a Sender Credential</Typography.Title> <br/>
    {frontendMessage && (
                    <div style={{fontFamily:"Roboto",fontSize:"18px"}} align="center">
                        {frontendMessage}
                    </div>
                )}
    <div style={{
        position:"absolute",
        display:"flex",
        justifyContent:'center',
        top:'15vh',
        height:'70vh',
        width:'90vw',
        
        
        }}>
        
        <Card style={{ width: 600, margin: "100px auto" }}>
            <Form layout="vertical" onFinish={submit} form={form}>
                
                <Form.Item name="senderEmail" rules={[{required: true, type: "email" }]} label="Sender Email">
                    <Input placeholder="Sender Email Id" />
                </Form.Item>
                <Form.Item name="password" rules={[{required: true }]} label="Password">
                    <Input placeholder="Sender Email Id" />
                </Form.Item>
                <Form.Item name="smtpServer" rules={[{required: true }]} label="SMTP Server String">
                    <Input placeholder="Sender Email Id" />
                </Form.Item>
                <Form.Item name="port" rules={[{required: true }]} label="Port">
                    <Input placeholder="Sender Email Id" />
                </Form.Item>
                
                <Button type="primary" htmlType="submit" style={{display:"block",margin:"0 auto"}}>
                Submit
                </Button>

                
                

            </Form>

        </Card>

    </div>
    

    
    
    
  
    
  </MainLayout>;
}
