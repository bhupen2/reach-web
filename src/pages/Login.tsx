import { Card, Form, Input, Button, Typography, message } from "antd";
import { useLogin } from "../auth/auth.mutations";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const loginMut = useLogin();
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (values: { email: string; password: string }) => {
    try {
      const res = await loginMut.mutateAsync(values);
      login(res.accessToken, res.role);
      nav("/dashboard");
    } catch {
      message.error("Login failed");
    }
  };

  return (
    <Card style={{ width: 360, margin: "100px auto" }}>
      <Typography.Title level={3}>Login</Typography.Title>
      <Form layout="vertical" onFinish={submit}>
        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loginMut.isPending}>
          Login
        </Button>
      </Form>
    </Card>
  );
}
