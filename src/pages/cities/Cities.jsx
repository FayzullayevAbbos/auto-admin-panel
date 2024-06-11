/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import getData from "../../hooks/getData";
import PostForm from "./components/PostForm";


function Cities() {
  const { getApi, datas } = getData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    getApi('cities');
  }, []);
 console.log(datas);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
    <div className="h-full">
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
         <PostForm setIsModalOpen={setIsModalOpen} getApi={getApi}/>
       </Modal>
     </div>
     <Table
     className=""
       pagination={{ pageSize: 8 }}
       columns={col}
       dataSource={datas}
       
     />
  </div>
  )
}

export default Cities