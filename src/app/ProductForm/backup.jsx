"use client";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuthContext } from "../global/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Space,
  Tag,
  message,
} from "antd";

import bikeData from "../data/bikes.json";
import colorData from "../data/colors.json";
import engineData from "../data/engines.json";
import conditionData from "../data/conditions.json";
const { Option } = Select;

export default function ProductForm() {
  const {
    loggedIn,
    setLoggedIn,
    localLoggedIn,
    setLocalLoggedIn,
    isAuthenticated,
    setIsAuthenticated,
    handleLogin,
    handleLogout,
  } = useAuthContext();

  const router = useRouter();
  const { CheckableTag } = Tag;
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data.categories);
        console.log("Categories loaded: ", response.data.categories);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchCategories();
  }, [loggedIn]);

  const [used, setUsed] = useState(true);
  const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState({
    brand: "",
    model: "",
    color: "",
    engine: "",
    mileage: "",
    year: "",
    condition: "",
  });
  const [bikeBrands, setBikeBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [colors, setColors] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [engines, setEngines] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [mileage, setMileage] = useState("");
  const [year, setYear] = useState("");
  const [conditions, setConditions] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // Ant design
  // const [componentDisabled, setComponentDisabled] = useState(false);

  // const handleCategoryChange = (category, checked) => {
  //   const nextSelectedCategories = checked
  //     ? [...selectedCategories, category]
  //     : selectedCategories.filter((c) => c !== category);
  //   setSelectedCategories(nextSelectedCategories);
  // };

  // Handlers
  // Category
  const handleCategoryChange = (category, checked) => {
    const categoryId = category._id; // Get the category ID
    const nextSelectedCategories = checked
      ? [...selectedCategories, categoryId] // Add the category ID
      : selectedCategories.filter((id) => id !== categoryId); // Filter out the category ID

    // setSelectedCategories(nextSelectedCategories);
    setSelectedCategories(nextSelectedCategories.map(String));
  };
  // const handleCategoryChange = (category, checked) => {
  //   const nextSelectedCategories = checked
  //     ? [...selectedCategories, category] // Add the category ID
  //     : selectedCategories.filter((id) => id !== category); // Filter out the category ID

  //   setSelectedCategories(nextSelectedCategories);
  // };

  // Radio
  const handleRadioChange = (e) => {
    setUsed(e.target.value === "true");
  };
  // Image
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };
  // Model and Select Model
  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setModels(bikeData.brands[value]);
    setDescription((prevState) => ({
      ...prevState,
      brand: value,
    }));
  };
  // Model
  const handleModelChange = (value) => {
    setSelectedModel(value);
    setDescription((prevState) => ({
      ...prevState,
      model: value,
    }));
  };
  // Color
  const handleColorChange = (value) => {
    setSelectedColor(value);
    setDescription((prevState) => ({
      ...prevState,
      color: value,
    }));
  };
  // Engine
  const handleEngineChange = (value) => {
    setSelectedEngine(value);
    setDescription((prevState) => ({
      ...prevState,
      engine: value,
    }));
  };
  // Milage
  const handleMileageChange = (value) => {
    setMileage(value);
    setDescription((prevState) => ({
      ...prevState,
      mileage: value,
    }));
  };
  // Year
  const handleYearChange = (value) => {
    setYear(value);
    setDescription((prevState) => ({
      ...prevState,
      year: value,
    }));
  };
  // Condition
  // const handleConditionChange = (value) => {
  //   // const value = e.target.value;
  //   setCondition(value);
  //   setDescription((prevState) => ({
  //     ...prevState,
  //     condition: value,
  //   }));
  // };
  const handleConditionChange = (value) => {
    setSelectedCondition(value);
    setDescription((prevState) => ({
      ...prevState,
      condition: value,
    }));
  };
  // Prices
  const handleSellingPriceChange = (value) => {
    setSellingPrice(value);
  };
  const handleOfferPriceChange = (value) => {
    setOfferPrice(value);
  };
  // const { Dragger } = Upload;

  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };
  // const props = {
  //   beforeUpload: (file) => {
  //     const isPNG = file.type === "image/png";
  //     if (!isPNG) {
  //       message.error(`${file.name} is not a png file`);
  //     }
  //     return isPNG || Upload.LIST_IGNORE;
  //   },
  //   name: "file",
  //   multiple: false,
  //   action: "/upload.do",
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };

  // UseEffects
  // Brand
  useEffect(() => {
    setBikeBrands(Object.keys(bikeData.brands));
    if (bikeBrands.length > 0) {
      setSelectedBrand(bikeBrands[0]);
    }
  }, [setSelectedBrand]);
  // Model
  useEffect(() => {
    if (selectedBrand) {
      setModels(bikeData.brands[selectedBrand]);
      setSelectedModel(bikeData.brands[selectedBrand][0]);
      console.log("Models: ", models);
    }
  }, [selectedBrand, setSelectedModel]);

  // Color
  useEffect(() => {
    setColors(colorData.colors);
    setSelectedColor(colors[0]);
  }, [setSelectedColor]);

  // Engine
  useEffect(() => {
    setEngines(engineData.engines);
    setSelectedEngine(engines[0]);
  }, [setSelectedEngine]);

  // Condition
  useEffect(() => {
    setConditions(conditionData.conditions);
    setSelectedCondition(conditions[0]);
  }, [setSelectedCondition]);

  // Form submit function
  const onFinish = async (values) => {
    console.log("Sending data....", values);

    const formData = {
      used,
      categories: [selectedCategories],
      image,
      description,
      sellingPrice,
      offerPrice,
      //   shop,
      views: 0,
      createdAt: new Date(),
    };
    try {
      const response = await axios.post("/products", formData);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onFinish(event.target.elements);
  };
  return (
    <>
      {!loggedIn && (
        <div>
          <h1>You are not logged in.</h1>
        </div>
      )}
      {loggedIn && (
        <>
          <div className="productForm">
            <div className="productFormContent" align="middle" justify="center">
              {/* Main Form */}
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                style={{
                  maxWidth: "90vw",
                }}
                onFinish={onFinish}
              >
                <Form.Item label="Used" name="used">
                  <Radio.Group
                    defaultValue={true}
                    onChange={handleRadioChange}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio value={true}> Yes </Radio>
                    <Radio value={false}> No </Radio>
                  </Radio.Group>
                </Form.Item>
                <br />

                {/* <Form.Item label="Category" name="selectedCategories">
                  <Space size={[0, 8]} wrap>
                    {categories.map((category) => (
                      <CheckableTag
                        style={{ fontSize: "1.1em", padding: "5px 12px" }}
                        key={category._id}
                        checked={selectedCategories.includes(category._id)}
                        onChange={(checked) =>
                          handleCategoryChange(category._id, checked)
                        }
                      >
                        {category.name}
                      </CheckableTag>
                    ))}
                  </Space>
                </Form.Item> */}
                <Form.Item label="Category" name="selectedCategories">
                  <Space size={[0, 8]} wrap>
                    {Object.values(categories).map((category) => (
                      <CheckableTag
                        style={{ fontSize: "1.1em", padding: "5px 12px" }}
                        key={category._id}
                        checked={selectedCategories.includes(category._id)}
                        onChange={(checked) =>
                          handleCategoryChange(category, checked)
                        }
                      >
                        {category.name}
                      </CheckableTag>
                    ))}
                  </Space>
                </Form.Item>

                <br />

                <Form.Item label="Image" name="image">
                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Form.Item>
                {/* <Form.Item label="Upload Product Image">
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </Form.Item> */}

                <br />
                <Form.Item label="Description" name="description">
                  <br />
                  <Form.Item label="Brand" name="brand">
                    <Select
                      defaultValue={selectedBrand}
                      showSearch
                      placeholder="Select Brand"
                      optionFilterProp="children"
                      onSearch={() => {}}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{ width: 320 }}
                      onChange={(value) => handleBrandChange(value)}
                      // onChange={(e) =>
                      //   setDescription((prevState) => ({
                      //     ...prevState,
                      //     brand: e.target.value,
                      //   }))
                      // }
                      options={bikeBrands?.map((brand) => ({
                        label: brand,
                        value: brand,
                      }))}
                    />
                  </Form.Item>
                  <br />
                  <Form.Item label="Model" name="model">
                    {/* {console.log("Models Loaded: ", models)} */}
                    <Select
                      value={selectedModel}
                      showSearch
                      placeholder="Select Model"
                      optionFilterProp="children"
                      onSearch={() => {}}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{ width: 320 }}
                      onChange={(value) => handleModelChange(value)}
                      // onChange={(e) =>
                      //   setDescription((prevState) => ({
                      //     ...prevState,
                      //     model: e.target.value,
                      //   }))
                      // }
                      options={models.map((model) => ({
                        label: model,
                        value: model,
                      }))}
                    />
                  </Form.Item>

                  <br />
                  <Form.Item label="Color" name="color">
                    <Select
                      value={selectedColor}
                      showSearch
                      placeholder="Select Color"
                      optionFilterProp="children"
                      onSearch={() => {}}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{ width: 320 }}
                      onChange={(value) => handleColorChange(value)}
                      options={colors.map((color) => ({
                        label: color,
                        value: color,
                      }))}
                    />
                  </Form.Item>
                  <br />
                  <Form.Item label="Engine" name="engine">
                    <Select
                      value={selectedEngine}
                      showSearch
                      placeholder="Select Engine"
                      optionFilterProp="children"
                      onSearch={() => {}}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{ width: 320 }}
                      onChange={(value) => handleEngineChange(value)}
                      // onChange={(e) =>
                      //   setDescription((prevState) => ({
                      //     ...prevState,
                      //     engine: e.target.value,
                      //   }))
                      // }
                      options={engines.map((engine) => ({
                        label: engine,
                        value: engine,
                      }))}
                    />
                  </Form.Item>
                  <br />
                  <Form.Item label="Mileage" name="mileage">
                    <InputNumber
                      min={0}
                      max={99999}
                      onChange={(value) => handleMileageChange(value)}
                      // onChange={(e) =>
                      //   setDescription((prevState) => ({
                      //     ...prevState,
                      //     mileage: e.target.value,
                      //   }))
                      // }
                      formatter={(value) =>
                        `${value}`.replace(
                          new RegExp(/\B(?=(\d{3})+(?!\d))/g),
                          ","
                        )
                      }
                      parser={(value) =>
                        value.replace(new RegExp(/\$\s?|(,*)/g), "")
                      }
                    />
                  </Form.Item>
                  <br />
                  <Form.Item label="Year" name="year">
                    <DatePicker
                      onChange={(value) => handleYearChange(value)}
                      picker="year"
                      format="YYYY"
                    />
                  </Form.Item>
                  <br />
                  {/* <Form.Item label="Condition" name="condition">
                    <Radio.Group
                      defaultValue={condition.toString()}
                      onChange={handleConditionChange}
                      optionType="button"
                      buttonStyle="solid"
                    >
                      <Radio value="Original"> Original </Radio>
                      <Radio value="Modified"> Modified </Radio>
                    </Radio.Group>
                  </Form.Item> */}
                  <Form.Item label="Condition" name="condition">
                    <Select
                      value={selectedCondition}
                      showSearch
                      placeholder="Select Condition"
                      optionFilterProp="children"
                      onSearch={() => {}}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{ width: 320 }}
                      onChange={(value) => handleConditionChange(value)}
                      options={conditions.map((condition) => ({
                        label: condition,
                        value: condition,
                      }))}
                    />
                  </Form.Item>
                </Form.Item>
                <br />
                <Form.Item label="Selling Price" name="sellingPrice">
                  <InputNumber
                    prefix="৳"
                    style={{
                      width: "30%",
                    }}
                    onChange={(value) => handleSellingPriceChange(value)}
                    // onChange={(e) =>
                    //   setDescription((prevState) => ({
                    //     ...prevState,
                    //     sellingPrice: e.target.value,
                    //   }))
                    // }
                    formatter={(value) =>
                      `${value}`.replace(
                        new RegExp(/\B(?=(\d{3})+(?!\d))/g),
                        ","
                      )
                    }
                    parser={(value) =>
                      value.replace(new RegExp(/\$\s?|(,*)/g), "")
                    }
                  />
                </Form.Item>
                <br />
                <Form.Item label="Offer Price" name="offerPrice">
                  {/* <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
              /> */}
                  <InputNumber
                    prefix="৳"
                    style={{
                      width: "30%",
                    }}
                    onChange={(value) => handleOfferPriceChange(value)}
                    // onChange={(e) =>
                    //   setDescription((prevState) => ({
                    //     ...prevState,
                    //     offerPrice: e.target.value,
                    //   }))
                    // }
                    formatter={(value) =>
                      `${value}`.replace(
                        new RegExp(/\B(?=(\d{3})+(?!\d))/g),
                        ","
                      )
                    }
                    parser={(value) =>
                      value.replace(new RegExp(/\$\s?|(,*)/g), "")
                    }
                  />
                </Form.Item>
                <br />
                {/* <Form.Item label>
            Shop:
            <select value={shop} onChange={(e) => setShop(e.target.value)}>
            <option value="">Select a shop</option>
            {shop.map((shop) => (
            <option key={shop._id} value={shop._id}>
            {shop.name}
            </option>
            ))}
            </select>
            </Form.Item> */}
                {/* <Form.Item label>
        Shop:
        <select value={shop} onChange={(e) => setShop(e.target.value)}>
          <option value="">Select a shop</option>
          {[
            "The Bike Shop",
            "Ride On Bikes",
            "Pedal Power",
            "Cycle City",
            "Wheels & Deals",
            "Bike World",
            "Spokes & Saddles",
            "Cranked Up Cycles",
            "Two Wheelers",
            "Chain Reaction",
          ].map((shopName) => (
            <option key={shopName} value={shopName}>
              {shopName}
            </option>
          ))}
        </select>
      </Form.Item> */}

                <br />
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  Add Product
                </Button>
              </Form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// export default () => <ProductForm />;
