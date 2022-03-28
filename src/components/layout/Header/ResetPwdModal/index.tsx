import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useUpdatePwd } from '@/api/user';
import './index.less';
import md5 from 'md5';

interface IProps {
  onOk: () => void;
  onCancel: () => void;
}

const Index: React.FC<IProps> = props => {
  const [form] = Form.useForm();
  const { run } = useUpdatePwd();
  const onFinish = (values: any) => {
    run({
      password: md5(values.password.trim()),
      oldPassword: md5(values.oldPassword.trim()),
    }).then(() => {
      message.success('密码更改成功！');
      props.onOk();
    });
  };

  const validatePassword = (rule: any, value: any, callback: any) => {
    const regex = /(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,14}/;
    if (!value) {
      callback();
      return;
    }

    if (!regex.test(value)) {
      callback('需符合"6-14位,字母/数字/特殊字符至少2种"');
      return;
    }
    callback();
  };

  const validatePasswordConfirm = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback();
      return;
    }
    const password = form.getFieldValue('password');
    if (!password) {
      callback('请先输入新密码！');
      return;
    }
    if (value !== password) {
      callback('与新密码不一致，请检查！');
      return;
    }
    callback();
  };
  return (
    <Modal
      title='修改密码'
      visible={true}
      footer={null}
      maskClosable={false}
      closable={false}
    >
      <Form
        className='pwd-form'
        form={form}
        name='basic'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label='原密码'
          name='oldPassword'
          rules={[{ required: true, message: '请输入原密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='新密码'
          name='password'
          rules={[
            { required: true, message: '请输入新密码！' },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='确认密码'
          name='passwordConfirm'
          rules={[
            { required: true, message: '请输入确认密码！' },
            { validator: validatePasswordConfirm },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' className='btn-submit'>
            提交
          </Button>
          <Button htmlType='button' onClick={props.onCancel}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Index;
