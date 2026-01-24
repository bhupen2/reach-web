import MainLayout from "../layout/MainLayout";
import { Card, Form, Typography,Input,Button,message,Col,Row} from "antd";
import { Select} from "antd";
import {useState,useEffect,ChangeEvent,FormEvent} from 'react';
import api from "../api/axios";

interface OptionType {
  value: string;
  label: string;
}

export default function EmailBounceStream(){
    const[form] = Form.useForm();
    const [emailbouncefileoptions, setEmailBounceFileOptions] = useState<OptionType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [streamMessage, setStreamMessage] = useState<string[]>([])

    useEffect(()=>{

        const fetchData = async () =>{
            try{
             // Call the server side API URL
            const response = await api.get('/run/getBounceEmailFileNames');
            // Transform the response into two lists for populating the two select options
            const emailBounceFileList = response.data;
            
            
            
            // Format the cust file for populating the select option. Id is required otherwise it throws a warning
            const formattedEmailBounceFileOptions: OptionType[] = emailBounceFileList.map((item:any) => ({
                value: item.id,
                label: item.value,
            }));
            
            
            
            setEmailBounceFileOptions(formattedEmailBounceFileOptions);
            setIsLoading(false);

            } 
            catch(err){
                setError('Failed to fetch options');
                setIsLoading(false);
            }
        }
        fetchData();
        

    },[]);

    

    const submit = async (values:{ fileName: string; startRow:string;endRow:string }) =>{

       
        message.info('Initiating Email Bounces Addition')

        // create a URL string, with parameters, for the calling the server side streaming function
        const params = new URLSearchParams({
                fileName:values.fileName,
                startRow:values.startRow,
                endRow:values.endRow

            });
        const streamingURLWithParams = `http://localhost:5015/run/bounceStream?${params}`

        // add an EventSource function to initiate open a connection with server side from client   
        const eventSource = new EventSource(streamingURLWithParams);

        //continuously read the messages sent from the server side
        eventSource.onmessage = (event) => {
                setStreamMessage(prev => [...prev,event.data]);

            };
        
        //add an event listener to listen to events from server. if a close event is sent then close the EventSource stream
        eventSource.addEventListener('close', function(event) {
                setStreamMessage(prev => [...prev,event.data]);
                eventSource.close();
            });


    };

    return <MainLayout>
        <Typography.Title level={1} align="center">Update Email Bounces From Uploaded File</Typography.Title>
        <Card style={{ width: '80vw', margin: "100px auto" }}>
            <Typography.Title level={3} align="center">Enter File Details</Typography.Title>
            <Form layout="vertical" onFinish={submit} form={form}>
               
                <Row gutter={16} justify="end" align="middle">
                    <Col className="gutter-row" span={5}>
                    <Form.Item name="fileName" rules={[{required: true}]} label="Email Bounce File">
                        {isLoading ? (<p>Loading sender options...</p>) : error ? (<p>{error}</p>) : 
                        (<Select
                                style={{ width: 250 }}
                                allowClear
                                options={emailbouncefileoptions}
                                placeholder="select it"
                                >

                        </Select> )}
                        </Form.Item>
                    
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <Form.Item name="startRow" rules={[{required: true}]} label="Start Row">
                        <Input style={{width:250}} placeholder="Enter start row number" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <Form.Item name="endRow" rules={[{required: true, }]} label="End Row">
                        <Input style={{width:250}}placeholder="Enter end row number" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Card style={{ width: '80vw', margin: "100px auto" }}>
            <Typography.Title level={3} align="center">Bounce Email Addition Tracker</Typography.Title>

        <div
            style={{
            maxHeight: '200px', // Set a fixed height
            overflowY: 'auto', // Enable vertical scrolling when content exceeds maxHeight
            paddingRight: '10px', // Add some padding so the scrollbar doesn't touch text
            }}>
                {/* Display streaming message from server side */}
            {streamMessage.map((msg,index) => (
                <p key={index}>{msg}</p>
            ))}


        </div>
        </Card>
    </MainLayout>

    
}