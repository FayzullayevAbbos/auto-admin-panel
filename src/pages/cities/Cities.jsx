/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import getData from "../../hooks/getData";
import PostForm from "./components/PostForm";

function Cities() {
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const { getApi, datas } = getData();
 

  useEffect(() => {
    getApi("cities");
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

  const token = localStorage.getItem("token");

  const handleDelete = async (record) => {
    try {
      // API chaqiruv - delete metodini chaqirish
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${record.id}`,
        {
          method: "DELETE",
          headers: {
            // "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        message.success(`Deleted ${record.name}`);
        getApi("cities");
      } else {
        message.error(`You can not delete`);
      }
    } catch (error) {
      message.error(`Error deleting ${record.name}`);
    }
  };


  const showModall = (record) => {
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

    formData.append("name", values.name);
    formData.append("slug", values.slug);
    formData.append("text", values.text);
    formData.append("images", imageUrl);
    setLoading(true);
    try {
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${currentRecord.id}`,
        {
          method: "PUT",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      if (response.ok) {
        setLoading(false);
        getApi('cities');
        message.success(`Updated ${values.name}`);
       
        form.resetFields();
        setIsModalVisible(false);
      } else {
        setLoading(false);
        message.error(`Failed to update ${values.name}`);
      }
    } catch (error) {
      setLoading(false);
      message.error(`Error updating ${currentRecord.name}`);
    }
  };

  const col = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
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
        visible={isModalVisible}
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
            name='name'
            label='Name'
            rules={[
              { required: true, message: "Please input the name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='slug'
            label='Slug'
            rules={[
              {
                required: true,
                message: "Please input the name in English!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='text'
            label='Text'
            rules={[
              {
                required: true,
                message: "Please input the name in English!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className='w-full '>
            <div className='flex flex-col gap-3'>
              <input
                className='file-input'
                type='file'
                onChange={(e) => handleFileChange(e)}
                required
                accept='image/*'
                name='file'
              />
              <img
                className='rounded-xl'
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

export default Cities;
