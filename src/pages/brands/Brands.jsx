/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useState } from "react";

import getData from "../../hooks/getData";
import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import PostForm from "./components/PostForm";

function Brands() {
  const { getApi, datas } = getData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token')
  const [form] = Form.useForm()
  useEffect(() => {
    getApi("brands");
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const showModall = (record) => {
    console.log(record);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setImage(
      `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${record.image_src}`,
    );
    setIsModalVisible(true);

  };
  const handleCancell = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (record) => {
    try {
     
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${record.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "multipart/form-data", 
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        message.success(`Deleted ${record.title}`);
        getApi('brands');
        // Ma'lumotlarni yangilash yoki qayta yuklash
      } else {
        message.error(`You can not delete`);
      }
    } catch (error) {
      message.error(`Error deleting ${record.title}`);
    }
  };

  const handleFileChange = (e) => {
    setImageUrl(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handlePut = async () => {
    const formData = new FormData();
    const values = form.getFieldsValue();

    formData.append("title", values.title);
    formData.append("images", imageUrl);
    setLoading(true);
    try {
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${currentRecord.id}`,
        {
          method: "PUT",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      console.log(response);
      if (response.ok) {
        console.log(values);
        setLoading(false);
        message.success(`Updated ${values.title}`);
      
          form.resetFields();
          setIsModalVisible(false);
          getApi('brands');
      } else {
        setLoading(false);
        message.error(`Failed to update ${values.title}`);
      }
    } catch (error) {
      setLoading(false);
      // message.error(`Error updating ${currentRecord.name}`);
    }
  };

  const col = [
    {
      title: "Title",
      dataIndex: "title",
      key: "name-ru",
    },
    {
      title: "IMAGES",
      dataIndex: "image_src",
      key: "name-ru",
      render: (text) => (
        <img
          key={text}
          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${text}`}
          alt={text}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <Popconfirm
            placement='leftTop'
            title={record.name_en}
            description={`are you sure to delete`}
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDelete(record)}
          >
            <Button type='primary' danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button onClick={() => showModall(record)} type='primary'>
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  console.log(datas);

  return (
    <div className='h-full'>
      <div className='w-full flex items-center justify-between pb-3 px-3'>
        <div className='text-[30px] font-bold '>Qo'shish</div>
        <Button
          onClick={showModal}
          type='primary'
          size='large'
          className='text-2xl'
        >
          <PlusCircleOutlined />
        </Button>
        <Modal
          title="Qo'shish"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <PostForm setIsModalOpen={setIsModalOpen} getApi={getApi} />
        </Modal>
      </div>
      <Table
        className=''
        pagination={{ pageSize: 8 }}
        columns={col}
        dataSource={datas}
      />
       <Modal
        title='Edit Item'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancell}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handlePut}
          layout='vertical'
          name='editForm'
        >
         
          <Form.Item
            name='title'
            label='Title'
            rules={[
              {
                required: true,
                message: "Please input the name in English!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item  className='w-full '>
            <div className='flex flex-col gap-3'>
              <input
              className="file-input"
                type='file'
                onChange={(e) => handleFileChange(e)}
                required
                accept='image/*'
                name='file'
              
              />
              <img
              className="rounded-xl"
                src={`${image}`}
                alt='Selected'
                style={{ width: "70px", height: "70px" }}
              />
            </div>
          </Form.Item>
          <Form.Item className='flex justify-end w-full'>
            <Button
              loading={loading}
              htmlType='submit'
              type='primary'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Brands;
