import MainLayout from "../layout/MainLayout";
import { Card, Form, Typography,Input,Button,message} from "antd";
import { Select} from "antd";
import {useState,useEffect,ChangeEvent,FormEvent} from 'react';
import api from "../api/axios";

interface OptionType {
  value: string;
  label: string;
}

export default function CampaignLiveStream(){

    const [senderoptions, setSenderOptions] = useState<OptionType[]>([]);
    const [cohortoptions, setCohortOptions] = useState<OptionType[]>([]);
    const [templateoptions, setTemplateOptions] = useState<OptionType[]>([]);
    const [selectedSenderValue, setSelectedSenderValue] = useState<string>('');
    const [selectedCohortValue, setSelectedCohortValue] = useState<string>('');
    const [selectedTemplateValue, setSelectedTemplateValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [streamMessage, setStreamMessage] = useState<string[]>([])

    //call the useEffect function to make a call to server and fetch all the values for the select options
    useEffect(()=>{
        
        const fetchData = async () => {
            try {
            // Call the server side API URL
            const response = await api.get('/run/getCampaignInitiationData');
            // Trasnform the response into three lists for populating the three select options
            const result = response.data;
            const senderEmailList = result.senderEmailList;
            const cohortList = result.cohortList;
            const emailTemplateList = result.emailTemplateList;
            
            // Format the sender email list for populating the select option. Id is required otherwise it throws a warning
            const formattedSenderOptions: OptionType[] = senderEmailList.map((item:any) => ({
                value: item.id,
                label: item.value,
            }));
            // Format the sender email list for populating the select option. Id is required otherwise it throws a warning
            const formattedCohortOptions: OptionType[] = cohortList.map((item:any) => ({
                value: item.id,
                label: item.value,
            }));
            // Format the sender email list for populating the select option. Id is required otherwise it throws a warning
            const formattedTemplateOptions: OptionType[] = emailTemplateList.map((item:any) => ({
                value: item.id,
                label: item.value,
            }));
            
            setSenderOptions(formattedSenderOptions);
            setCohortOptions(formattedCohortOptions);
            setTemplateOptions(formattedTemplateOptions);
            
            setIsLoading(false);
            } catch (err) {
            setError('Failed to fetch options');
            setIsLoading(false);
            }
        };

    fetchData();
    },[]);

    //function to handle any selection for sender email select
    const handleSenderChange = (event:ChangeEvent<HTMLSelectElement>) =>{
        setSelectedSenderValue(event.target.value)
    };
    //function to handle any selection for cohort select
    const handleCohortChange = (event:ChangeEvent<HTMLSelectElement>) =>{
        setSelectedCohortValue(event.target.value)
    };
    //function to handle any selection for email template select
    const handleTemplateChange = (event:ChangeEvent<HTMLSelectElement>) =>{
        setSelectedTemplateValue(event.target.value)
    };

    //function to handle submit after all selection is made
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        message.info('Initiating Sending of Email',10)

        // create a URL string, with parameters, for the calling the server side streaming function
        const params = new URLSearchParams({
                cohortName:selectedCohortValue,
                senderEmail:selectedSenderValue,
                emailTemplates:selectedTemplateValue

            });
        const streamingURLWithParams = `http://localhost:5015/run/streamCampaign?${params}`

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
    <Typography.Title level={1} align="center">Start and Monitor Email Campaign</Typography.Title>
    {/* Card for displaying select for - sender email, cohort, email template */}
    <Card style={{ width: '80vw', margin: "100px auto" }}>
        <Typography.Title level={3} align="center">Select Campaign Details</Typography.Title>
        <div style ={{display:'flex',justifyContent:'center'}}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="sender-email-select">Sender Email:</label>

                {isLoading ? (<p>Loading sender options...</p>) : error ? (<p>{error}</p>) : 
                    (
                        <select id="sender-email-select" onChange={handleSenderChange}>
                            {/* Optional: Add a default "Select an option" choice */}
                            <option value="">-- Select an option --</option> 
                            {senderoptions.map((option) => (
                            <option key={option.value} value={option.label}>{option.label}</option>
                            )
                        )}
                        </select>

                        
                    )
                }

                <label htmlFor="cohort-select">Cohort:</label>
            
                {isLoading ? (<p>Loading cohort options...</p>) : error ? (<p>{error}</p>) : 
                    (
                        <select id="cohort-select" onChange={handleCohortChange}>
                            {/* Optional: Add a default "Select an option" choice */}
                            <option value="">-- Select an option --</option> 
                            {cohortoptions.map((option) => (
                            <option key={option.value} value={option.label}>{option.label}</option>
                            )
                        )}
                        </select>
                    )
                }

                <label htmlFor="template-select">Email Template:</label>
            
                {isLoading ? (<p>Loading email template options...</p>) : error ? (<p>{error}</p>) : 
                    (
                        <select id="template-select" onChange={handleTemplateChange}>
                            {/* Optional: Add a default "Select an option" choice */}
                            <option value="">-- Select an option --</option> 
                            {templateoptions.map((option) => (
                            <option key={option.value} value={option.label}>{option.label}</option>
                            )
                        )}
                        </select>
                    )
                }

            
            <button type="submit">Submit</button>

        </form>

        </div>
        
    </Card>
    {/* Card for displaying the emails being sent once the campaign starts*/}
    <Card style={{ width: '80vw', margin: "100px auto" }}>
        <Typography.Title level={3} align="center">Sent Email</Typography.Title>

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