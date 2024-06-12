/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, message } from "antd";
import { useState } from "react";

function PostForm({setIsModalOpen, getApi}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");

  const [imageUrl, setImageUrl] = useState();
  const formData = new FormData();
  const onsubmit = (value) => {
    setLoading(true);
    formData.append("name", value.name);
    formData.append("slug", value.slug);
    formData.append("text", value.text);
    formData.append("images", imageUrl);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations", {
      method: "POST",
      body: formData,
      headers: {
        // "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(en.current.input);'
        console.log(data);
        setLoading(false);
        if (data.success) {
          form.resetFields();
          getApi('locations')
          setIsModalOpen(false)
          setImageUrl(null);
          message.info("success");
        } else {
          message.error("error");
        }
      });
  };

  return (
    <Form form={form} onFinish={onsubmit} layout='vertical'>
      <Form.Item name='name' label='Name'>
        <Input placeholder='Name' />
      </Form.Item>
      <Form.Item name='slug' label='Slug'>
        <Input placeholder='Text' />
      </Form.Item>
      <Form.Item name='text' label='Text'>
        <Input placeholder='Text' />
      </Form.Item>

      <Form.Item>
        <input
          value={null}
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
