/* eslint-disable react/prop-types */
/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */

import { Button, Form, Input, Upload, message } from "antd";
import { useRef, useState } from "react";


function PushForm({getApi, setIsModalOpen}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  
  const [imageUrl, setImageUrl] = useState();
  const formData = new FormData();
  const file = useRef();
  const en = useRef();
  const ru = useRef();
  const onsubmit = (values) => {
    setLoading(true);
    formData.append("name_en", values.name_en);
    formData.append("name_ru", values.name_ru);
    formData.append("images", imageUrl);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      body: formData,
      headers: {
        // "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(en.current.input);
        setLoading(false);
        if (data.success) {
          form.resetFields();
          getApi()
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
      <Form.Item name='name_en' label='Name_EN'>
        <Input ref={en} placeholder='Name' />
      </Form.Item>
      <Form.Item name='name_ru' label='Name_RU'>
        <Input ref={ru} placeholder='Name' />
      </Form.Item>

      <Form.Item>
        <input
            ref={file}
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

export default PushForm;
