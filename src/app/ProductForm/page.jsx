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
  const { loggedIn, handleLogout } = useAuthContext();

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
    async function fetchShops() {
      try {
        const response = await axios.get("/shops");
        setShops(response.data.shops);
        console.log("Shops loaded: ", response.data.shops);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchShops();
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
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
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

  // Shop
  const handleShopChange = (value) => {
    setSelectedShop(value);
  };

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

  // Shop
  useEffect(() => {
    setSelectedShop(shops[0]);
  }, [setSelectedShop]);

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
      shop: selectedShop,
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
                      options={bikeBrands?.map((brand) => ({
                        label: brand,
                        value: brand,
                      }))}
                    />
                  </Form.Item>
                  <br />
                  <Form.Item label="Model" name="model">
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
                  <InputNumber
                    prefix="৳"
                    style={{
                      width: "30%",
                    }}
                    onChange={(value) => handleOfferPriceChange(value)}
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
                <Form.Item label="Shop">
                  <Select
                    value={selectedShop}
                    showSearch
                    placeholder="Select Shop"
                    optionFilterProp="children"
                    onSearch={() => {}}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: 320 }}
                    onChange={(value) => handleShopChange(value)}
                    options={Object.entries(shops).map(([key, value]) => ({
                      label: value.name,
                      value: value._id,
                    }))}
                  />
                </Form.Item>
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
