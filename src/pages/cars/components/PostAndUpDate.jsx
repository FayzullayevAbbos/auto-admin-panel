/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Switch, Upload } from "antd";
import getData from "../../../hooks/getData";
import { useEffect, useState } from "react";

function PostAndUpDate() {
  const form = Form.useForm();
  const { getApi } = getData();
  
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [city, setCity] = useState();
  const [currentItem, setCurrentItem] = useState(null);
  
 
  
  useEffect(()=> {
    setBrand(getApi('brands'))
    setCategory(getApi('categories'))
    setCity(getApi('cities'))
    setLocation('locations')
    setModel('models')
  },[])

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Form form={form}  layout='vertical'>
      <Form.Item
        label='Category'
        name='category_id'
        rules={[
          { required: true, message: "Please select a category!" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Select placeholder='Select Category'>
          {category?.map((item) => (
            <Select.Option
              key={item.id}
              value={item.id}
              disabled={item.disabled}
            >
              {item.name_en}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Brand'
        name='brand_id'
        rules={[{ required: true, message: "Please input!" }]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Select placeholder='Select Brand'>
          {brand?.map((item) => (
            <Select.Option
              key={item.id}
              value={item.id}
              disabled={item.disabled}
            >
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Model'
        name='model_id'
        rules={[{ required: true, message: "Please input!" }]}
        style={{ flex: "0 0 33%" }}
      >
        <Select placeholder='Select Model'>
          {model?.map((item) => (
            <Select.Option
              key={item.id}
              value={item.id}
              disabled={item.disabled}
            >
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Location'
        name='location_id'
        rules={[{ required: true, message: "Please input!" }]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Select placeholder='Select Location'>
          {location?.map((item) => (
            <Select.Option
              key={item.id}
              value={item.id}
              disabled={item.disabled}
            >
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='City'
        name='city_id'
        rules={[{ required: true, message: "Please input!" }]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Select placeholder='Select City'>
          {city?.map((item) => (
            <Select.Option
              key={item.id}
              value={item.id}
              disabled={item.disabled}
            >
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='color'
        label='Color'
        rules={[{ required: true, message: "Please enter the name" }]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='year'
        label='Yil'
        rules={[{ required: true, message: "Please enter the year" }]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='seconds'
        label='Seconds'
        rules={[
          { required: true, message: "Please enter the color" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='max_speed'
        label='Speed'
        rules={[
          { required: true, message: "Please enter the speed" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='max_people'
        label='Max People'
        rules={[
          { required: true, message: "Please enter the max people" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='motor'
        label='Motor'
        rules={[
          { required: true, message: "Please enter the motor" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='transmission'
        label='Transmission'
        rules={[
          {
            required: true,
            message: "Please enter the transmission",
          },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='drive_side'
        label='Drive Side'
        rules={[
          { required: true, message: "Please enter the drive side" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='petrol'
        label="Yoqilg'i"
        rules={[
          { required: true, message: "Please enter the yoqilg'i" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='limitperday'
        label='Limit Per Day'
        rules={[
          {
            required: true,
            message: "Please enter the limit per day",
          },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='deposit'
        label='Deposit'
        rules={[
          { required: true, message: "Please enter the deposit" },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='premium_protection'
        label='Premium Protection Price'
        rules={[
          {
            required: true,
            message: "Please enter the premium protection price",
          },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='price_in_aed'
        label='Price in AED'
        rules={[
          {
            required: true,
            message: "Please enter the price in AED",
          },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='price_in_usd'
        label='Price in USD(Otd)'
        rules={[
          {
            required: true,
            message: "Please enter the price in USD(Otd)",
          },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='price_in_aed_sale'
        label='Price in AED (Otd)'
        rules={[
          {
            required: true,
            message: "Please enter the price in AED (Otd)",
          },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='price_in_usd_sale'
        label='Price in USD'
        rules={[
          {
            required: true,
            message: "Please enter the price in USD",
          },
        ]}
        style={{ flex: "0 0 33%", paddingRight: "8px" }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='inclusive'
        label='Inclusive'
        style={{ flex: "0 0 15%", paddingRight: "8px" }}
        valuePropName='checked'
      >
        <Switch onChange={(checked) => setInclusive(checked)} />
      </Form.Item>
      {!currentItem ? (
        <>
          <Form.Item
            name='images1'
            label='Upload car images'
            rules={[
              { required: true, message: "Please upload images" },
            ]}
            valuePropName='fileList'
            getValueFromEvent={normFile}
            style={{ flex: "0 0 25%", paddingRight: "8px" }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              listType='picture-card'
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name='images2'
            label='Upload the main image'
            rules={[
              {
                required: true,
                message: "Please upload the main image",
              },
            ]}
            valuePropName='fileList'
            getValueFromEvent={normFile}
            style={{ flex: "0 0 25%", paddingRight: "8px" }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              listType='picture-card'
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name='cover'
            label='Upload the cover image'
            rules={[
              {
                required: true,
                message: "Please upload the cover image",
              },
            ]}
            valuePropName='fileList'
            getValueFromEvent={normFile}
            style={{ flex: "0 0 25%", paddingRight: "8px" }}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              listType='picture-card'
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </>
      ) : null}
    </Form>
  );
}

export default PostAndUpDate;
