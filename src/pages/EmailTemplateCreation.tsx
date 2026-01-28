import MainLayout from "../layout/MainLayout";
import { Card, Form, Input, Button, Typography, message, Select} from "antd";
import { createCohort } from "../api/cohortcreation";
import {useState,useEffect} from 'react';
import api from "../api/axios";


interface OptionType {
  value: string;
  label: string;
}
interface EmailTemplateCreationResponse {
    message:string;
}
export default function CreateEmailTemplate(){

    const {TextArea} = Input;
    const[form] = Form.useForm();
    const [templatefileoptions, setTemplateFileOptions] = useState<OptionType[]>([]);
    const [error, setError] = useState<string | null>(null);

    

    useEffect(()=>{

            const fetchData =async () =>{
                try{
                // Call the server side API URL
                const response = await api.get('/campaign/getFileNameForTemplates');
                // Transform the response into select options
                const templateFileList = response.data;
                
                
                
                
                // Format the cust file for populating the select option. Id is required otherwise it throws a warning
                const formattedCustFileOptions: OptionType[] = templateFileList.map((item:any) => ({
                    value: item.id,
                    label: item.value,
                }));
                
                
                
                setTemplateFileOptions(formattedCustFileOptions);
                
                

            } 
            catch(err){

                setError('Failed to fetch options');
                

            }
            };
            fetchData();
            

        },[]);

        const submit = async (values: { templateName: string; description: string; subjectLine:string;fileName:string,shortCode:string }) => {
           

            const response = await api.post<EmailTemplateCreationResponse>('/campaign/addEmailTemplate', values);
            message.info(response.data.message,10)
            form.resetFields();
        };


  return <MainLayout>
    <Typography.Title level={1} align="center">Add Email Templates</Typography.Title> <br/>
    <div style={{
        position:"absolute",
        display:"flex",
        justifyContent:'center',
        top:'15vh',
        height:'90vh',
        width:'90vw',
        
        
        }}>
            <Card style={{ width: 600, margin: "100px auto" }}>
            <Form layout="vertical" onFinish={submit} form={form}>
                
                <Form.Item name="templateName" rules={[{required: true}]} label="Template Name">
                    <Input placeholder="Enter a name text string" />
                </Form.Item>
                <Form.Item name="description" rules={[{required: true }]} label="Description">
                    <TextArea rows={4} placeholder="Max 3000 characters" maxLength={3000}/>
                </Form.Item>
                <Form.Item name="subjectLine" rules={[{required: true }]} label="Subject Line">
                    <TextArea rows={2} placeholder="Max 50 characters" maxLength={50}/>
                </Form.Item>
                <Form.Item name="fileName" rules={[{required: true}]} label="Customer File">
                        
                        <Select
                                style={{ width: 250 }}
                                allowClear
                                options={templatefileoptions}
                                placeholder="select it">

                        </Select>
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