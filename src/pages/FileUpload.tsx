import MainLayout from "../layout/MainLayout";
import { Card,Upload, Form, Button, Typography, message} from "antd";
import { UploadOutlined} from "@ant-design/icons";
import { Select} from "antd";
import { UploadProps,UploadFile } from "antd";
import api from "../api/axios";



import {useState} from 'react';


export default function FileUpload() {
  
  const[form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);//create a state for file list selected
  
  
  const handleFileChange: UploadProps['onChange'] = ({ fileList }) => {
    // Update the file list in the state
    setFileList(fileList);
  };

  const handleRemove = (file: UploadFile) => {
    // Filter out the removed file from the state
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    return true; // Allow Antd to handle the UI removal
  };

  

  const submit = async (values: any) => {
    const formData = new FormData();

    
    //Variable to capture the file object from front end selection
    const file = values.upload && values.upload[0] ? values.upload[0].originFileObj : null;
    const filetype = values.filetype
    try{

      if (file && filetype){
        
        //Create the payload for api call
        formData.append('file',file);
        formData.append('filetype',filetype);

        const response = await api.post('/uploadfile', formData, 
        {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept':'text/html'
                  },
                }
             );

        
        message.info(response.data.message,10)
       
      }
       
      else {
        message.error('Select a file to upload',10)
      }
    }
    catch (e){

        message.error(`${e}`,10);
    }
    
  };
  
  

  return <MainLayout>
    <Typography.Title level={1} align="center">Upload Files</Typography.Title> <br/>
    <Typography.Paragraph align="center">
        <Typography.Text>Customer File - Excel</Typography.Text><br/>
        <Typography.Text>Email Template - HTML</Typography.Text><br/>
        <Typography.Text>Email Bounces File - Excel</Typography.Text><br/>
        
    </Typography.Paragraph> <br/>
    
    <div style={{
        position:"absolute",
        display:"flex",
        justifyContent:'center',
        top:'25vh',
        height:'60vh',
        width:'90vw',
        
        
        }}>
        
        <Card style={{ width: 600, margin: "100px auto" }}>
            <Form layout="vertical" onFinish={submit} form={form}>
                <Form.Item name="filetype" rules={[{required: true}]} label="File Type">
                        <Select
                            style={{ width: 200 }}
                            allowClear
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
                </Form.Item>
                <Form.Item name="upload" label="Upload File" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
                    <Upload
                        onRemove={handleRemove}
                        beforeUpload={() => false} // Prevents automatic upload
                        fileList={fileList}
                        onChange={handleFileChange}
                        multiple={false} // Allow multiple files
                        maxCount={1}
        >
                        <Button icon={<UploadOutlined />}>Select File(s)</Button>
                    </Upload>
                    
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{display:"block",margin:"0 auto"}}>
                Submit
                </Button>
            </Form>
        </Card>
    </div>
  </MainLayout>;
}
