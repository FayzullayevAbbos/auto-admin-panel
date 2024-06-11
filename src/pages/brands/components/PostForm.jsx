/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Affix, Button, Form, Input, message } from "antd";
import { useState } from "react";

function PostForm({ setIsModalOpen, getApi }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [imageUrl, setImageUrl] = useState();
  const formData = new FormData();

  const onSubmit = (values) => {
    setLoading(true);
    formData.append("title", values.title);
    formData.append("images", imageUrl);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          form.resetFields();
          getApi('brands');
          setIsModalOpen(false)
          setImageUrl(null);
          message.info("success");
        } else {
          message.error("error");
        }
      });
  };
  return (
    <Form form={form} onFinish={onSubmit} layout='viritcal'>
      <Form.Item name={"title"} label='Title'>
        <Input required placeholder='title' />
      </Form.Item>

      <Form.Item>
        <input
          type='file'
          onChange={(e) => setImageUrl(e.target.files[0])}
          required
          accept='image/*'
        />
      </Form.Item>
      <Form.Item className='flex justify-end w-full'>
        <Button loading={loading} htmlType='submit' type='primary'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PostForm;
