import MainLayout from "../layout/MainLayout";
import { Card, Form, Input, Button, Typography, message, Col,Row } from "antd";
import { createCohort } from "../api/cohortcreation";
import {useState} from 'react';


export default function CreateCohort(){
    const[form] = Form.useForm()

    const {TextArea} = Input;

    const createCohortMutate = createCohort();

    const submit = async (values: { cohortName: string; description: string; shortCode:string}) => {

    const res = await createCohortMutate.mutateAsync(values);
    message.info(res.message,10)
    form.resetFields();

    
  };


    return <MainLayout>
    <Typography.Title level={1} align="center">Add New Cohort</Typography.Title> <br/>
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
                
                <Form.Item name="cohortName" rules={[{required: true}]} label="Cohort Name">
                    <Input placeholder="Enter a name text string" />
                </Form.Item>
                <Form.Item name="description" rules={[{required: true }]} label="Description">
                    <TextArea rows={4} placeholder="Max 3000 characters" maxLength={3000}/>
                </Form.Item>
                <Form.Item name="shortCode" rules={[{required: true }]} label="Short Code">
                    <Input placeholder="Max 5 Characters" maxLength={5} />
                </Form.Item>
                
                
                <Button type="primary" htmlType="submit" style={{display:"block",margin:"0 auto"}}>
                Submit
                </Button>

                
                

            </Form>

        </Card>

        </div>
    
    </MainLayout>

}

