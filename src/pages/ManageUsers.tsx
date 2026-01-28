import MainLayout from "../layout/MainLayout";
import { Card, Form, Typography} from "antd";
import { Select} from "antd";
import {useState,useEffect} from 'react';
import DisplayTable from "../components/DisplayTable"

export default function ManageUsers(){


return <MainLayout>
    <Typography.Title level={1} align="center">Manage Users</Typography.Title>
    <Card style={{ width: '80vw', margin: "80px auto"}}>
        <DisplayTable urlEndPoint='/user/getUserList' param1Name= 'userfilter' param1Value='all'/>
    </Card>
</MainLayout>

}