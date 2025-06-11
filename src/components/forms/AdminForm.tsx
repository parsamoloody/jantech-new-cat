"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Editor from "@/components/Editor";
import { v4 as uuidv4 } from "uuid";
import { IoAddCircleOutline } from "react-icons/io5";
import { useAppSelector } from "@/lib/states/hooks";
import axios from "axios";

export default function AdminForm() {
  const t = useAppSelector(state => state.dictionary.content?.components.adminForm);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    score: "",
    image: "",
    features: [
      {
        id: uuidv4(),
        key: "",
        value: ""
      }
    ],
    detailContent: "",
  });

  if (!t) return null;

  const sleep = () => new Promise(resolve => setTimeout(resolve, 2000));

  const changeFeatureHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string, property: "key" | "value") => {
    const updatedFeatures = form.features.map(feature => feature.id === id ? { ...feature, [property]: e.target.value } : feature);
    setForm({ ...form, features: updatedFeatures });
  };

  const removeFeatureHandler = (id: string) => {
    const filteredFeatures = form.features.filter(feature => feature.id !== id)
    setForm({ ...form, features: filteredFeatures });
  };

  const addFeatureHandler = () => {
    setForm({ ...form, features: [...form.features, { id: uuidv4(), key: "", value: "" }] });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const initialResponse = await axios.post("http://localhost:8000/api/translate", form, {
        params: { langs: "ar,en,fa,ru,tr" },
      });

      let data = initialResponse.data;

      while (data.status === "pending") {
        await sleep();

        const pollResponse = await axios.get(`http://localhost:8000/api/translate/${data.hash}`);

        data = pollResponse.data;
      }

      console.log("Translations completed:", data.translatedSource);
      await axios.post("http://localhost:8000/api/products/create", {
        originalData: form,
        translatedData: data.translatedSource,
      });
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <div className="wrapper min-h-screen flex items-center justify-center w-full max-w-[800px]">
      <form className="space-y-4 w-full py-2" onSubmit={submitHandler}>
        <div>
          <label
            htmlFor="name"
          >
            {t.name}
          </label>
          <Input
            id="name"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label
            htmlFor="description"
          >
            {t.description}
          </label>
          <Textarea
            id="description"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label
            htmlFor="category"
          >
            {t.category}
          </label>
          <Input
            id="category"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label
            htmlFor="price"
          >
            {t.price}
          </label>
          <Input
            id="price"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label
            htmlFor="score"
          >
            {t.score}
          </label>
          <Input
            id="score"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label
            htmlFor="image"
          >
            {t.image}
          </label>
          <Input
            id="image"
            onChange={changeHandler}
          />
        </div>
        {form.features.map(feature => (
          <div key={feature.id} className="flex justify-between gap-4 w-full">
            <div>
              <label
                htmlFor="featureTitle"
              >
                {t.featureTitle}
              </label>
              <Input
                id="featureTitle"
                onChange={(e) => changeFeatureHandler(e, feature.id, "key")}
              />
            </div>
            <div>
              <label
                htmlFor="featureValue"
              >
                {t.featureValue}
              </label>
              <Input
                id="featureValue"
                onChange={e => changeFeatureHandler(e, feature.id, "value")}
              />
            </div>
            <div className="flex items-center justify-center gap-3 h-[42px] self-end">
              <Button
                icon={<IoAddCircleOutline className="size-8 h-[42px] rounded-full rotate-45 text-slate-400 hover:text-red-primary" />}
                onClick={() => removeFeatureHandler(feature.id)}
              />
              <Button
                icon={<IoAddCircleOutline className="size-8 rounded-full text-slate-400 hover:text-red-primary" />}
                onClick={() => addFeatureHandler()}
              />
            </div>
          </div>
        ))}
        <Editor form={form} setForm={setForm} />
        <Button
          title={t.submit}
          type="submit"
          className="bg-red-primary text-white w-full py-2 font-bold"
        />
      </form>
    </div>
  );
}
