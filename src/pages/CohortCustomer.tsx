import MainLayout from "../layout/MainLayout";
import { Card, Form, Typography,Input,Button,message,Row,Col} from "antd";
import { Select} from "antd";
import {useState,useEffect,ChangeEvent,FormEvent} from 'react';
import api from "../api/axios";

interface OptionType {
  value: string;
  label: string;
}

export default function CohortCustomerLiveStream(){
    const[form] = Form.useForm();
    const [cohortoptions, setCohortOptions] = useState<OptionType[]>([]);
    const [custfileoptions, setCustFileOptions] = useState<OptionType[]>([]);
    const [selectedCohortValue, setSelectedCohortValue] = useState<string>('');
    const [selectedCustFileValue, setSelectedCustFileValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [streamMessage, setStreamMessage] = useState<string[]>([])


    useEffect(()=>{

        const fetchData =async () =>{
            try{
            // Call the server side API URL
            const response = await api.get('/customer/getCustomerCohortMenu');
            // Transform the response into two lists for populating the two select options
            const result = response.data;
            const cohortList = result.cohortList;
            const custFileList = result.custFileList;
            
            
            // Format the cohort list for populating the select option. Id is required otherwise it throws a warning
            const formattedCohortOptions: OptionType[] = cohortList.map((item:any) => ({
                value: item.id,
                label: item.value,
            }));
            // Format the cust file for populating the select option. Id is required otherwise it throws a warning
            const formattedCustFileOptions: OptionType[] = custFileList.map((item:any) => ({
                value: item.id,
                label: item.value,
            }));
            
            
            setCohortOptions(formattedCohortOptions);
            setCustFileOptions(formattedCustFileOptions);
            
            setIsLoading(false);

        } 
        catch(err){

            setError('Failed to fetch options');
            setIsLoading(false);

        }
        };
        fetchData();
        

    },[]);

    //function to handle any selection for cohort select
    const handleCohortChange = (value:string) =>{
        setSelectedCohortValue(value)
    };
    //function to handle any selection for email template select
    const handleTemplateChange = (option:string) =>{
        setSelectedCustFileValue(option)
    };

    const submit = async (values: { cohortselect: string; customerfile: string; startrow:string;endrow:string }) => {

        
        message.info('Initiating Sending of Email',10)

        // create a URL string, with parameters, for the calling the server side streaming function
                const params = new URLSearchParams({
                cohortName:values.cohortselect,
                fileName:values.customerfile,
                startRow:values.startrow,
                endRow:values.endrow

            });
        const streamingURLWithParams = `${import.meta.env.VITE_BASE_URL}customer/custUploadStream?${params}`

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
        <Typography.Title level={1} align="center">Add Customer to Cohort</Typography.Title>
        {/* Card for displaying select for - sender email, cohort, email template */}
        <Card style={{ width: '80vw', margin: "100px auto" }}>
            <Typography.Title level={3} align="center">Select Cohort and Customer File</Typography.Title>
            <Form layout="vertical" onFinish={submit} form={form}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="cohortselect" rules={[{required: true}]} label="Cohort">
                        {isLoading ? (<p>Loading sender options...</p>) : error ? (<p>{error}</p>) : 
                        (<Select
                                style={{ width: 250 }}
                                allowClear
                                onChange={handleCohortChange}
                                options={cohortoptions}
                                placeholder="select it"
                                >

                        </Select> )}
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="customerfile" rules={[{required: true}]} label="Customer File">
                        {isLoading ? (<p>Loading sender options...</p>) : error ? (<p>{error}</p>) : 
                        (<Select
                                style={{ width: 250 }}
                                allowClear
                                onChange={handleTemplateChange}
                                options={custfileoptions}
                                placeholder="select it">

                        </Select>)}
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="startrow" rules={[{required: true}]} label="Start Row">
                        <Input style={{width:250}} placeholder="Enter start row number" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="endrow" rules={[{required: true, }]} label="End Row">
                        <Input style={{width:250}}placeholder="Enter end row number" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Col>

                </Row>
                
            </Form>
        </Card>
        <Card style={{ width: '80vw', margin: "100px auto" }}>
            <Typography.Title level={3} align="center">Customer Addition Tracker</Typography.Title>

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