import MainLayout from "../layout/MainLayout";
import { Card, Form, Input, Button, Typography, message, Col,Row } from "antd";

export default function Dashboard() {
  return <MainLayout>
    <Typography.Title level={1} align="center">What You Can Do?</Typography.Title>
    <Row>
      <Col span={8}>
        <Card style={{ width: 360, height: 150, margin: "100px auto" }}>
          <Typography.Title level={3}>Basic Setup</Typography.Title>
          <Typography.Link href="/sendercredential">Add Sender Credentials</Typography.Link><br/>
      
        </Card>
      </Col>

      <Col span={8}>
        <Card style={{ width: 360, height: 150,margin: "100px auto" }}>
          <Typography.Title level={3}>Files Management</Typography.Title>
          <Typography.Link href="/fileupload">Upload a File</Typography.Link><br/>
          <Typography.Link href="/viewfiles">View Uploaded Files</Typography.Link><br/>
          

      
        </Card>
      </Col>
      <Col span={8}>
        <Card style={{ width: 360, height: 150, margin: "100px auto" }}>
          <Typography.Title level={3}>Customer Management</Typography.Title>
          <Typography.Link href="/createcohort">Create Cohort</Typography.Link><br/>
          <Typography.Link href="/addcohortcustomer">Add Customer To Cohort</Typography.Link><br/>
      
        </Card>
      
      </Col>
    </Row>

    <Row>
      <Col span={8}>
        <Card style={{ width: 360,height:150, margin: "100px auto" }}>
          <Typography.Title level={3}>Campaign Setup</Typography.Title>
          <Typography.Link href="/createtemplate">Add Email Template</Typography.Link><br/>
          <Typography.Link href="">Generate Trackable Link</Typography.Link><br/>
      
        </Card>
      
      </Col>

      <Col span={8}>
      <Card style={{ width: 360, height:150, margin: "100px auto" }}>
          <Typography.Title level={3}>Campaign Tracking</Typography.Title>
          <Typography.Link href="/campaignlivestream">Start Email Campaign</Typography.Link><br/>
          <Typography.Link href="/emailbouncestream">Upload Email Bounces</Typography.Link><br/>
      
        </Card>
      
      </Col>
      <Col span={8}>
      <Card style={{ width: 360, height:150, margin: "100px auto" }}>
          <Typography.Title level={3}>Reports</Typography.Title>
          <Typography.Link href="">View Tabular Report</Typography.Link><br/>
          <Typography.Link href="">View Charts</Typography.Link><br/>
      
        </Card>
      
      </Col>
    </Row>
    
  </MainLayout>;
}
