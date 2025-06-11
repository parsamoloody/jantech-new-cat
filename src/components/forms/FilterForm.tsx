"use client";

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BiFilter } from "react-icons/bi";
import { useAppSelector } from '@/lib/states/hooks';
import { FaFilterCircleXmark } from 'react-icons/fa6';
import Button from '../Button';
import { Category } from '@/types';
import { VscRefresh } from "react-icons/vsc"
import { GoHorizontalRule } from "react-icons/go";

interface Props {
    category: Category;
}

export default function FilterForm({
    category,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const t = useAppSelector(state => state.dictionary.content?.components.filterForm);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [rangeValue, setRangeValue] = useState(0);

    const formatValue = (value: number) => value.toLocaleString();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log('Form Data:', data);
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setRangeValue(value);
        setValue(e.target.name, value);
    };

    const handleReset = () => {
        reset();
        setRangeValue(0);
    };

    if (!t) return null;

    return (
        <>
            {t[category] && (
                <>
                    <div
                        className="flex items-center gap-1 lg:hidden cursor-pointer w-fit hover:opacity-80 transition-opacity"
                        onClick={() => setIsOpen(true)}
                    >
                        <FaFilterCircleXmark className="text-xl text-red-primary " />
                        <span className="font-medium">{t.filter}</span>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={` bg-white shadow-lg pb-4 fixed lg:sticky lg:top-24 rounded-t-3xl lg:rounded-xl left-0 right-0 z-20 w-full lg:max-w-[350px] lg:h-full max-h-[calc(100vh-130px)] lg:max-h-[calc(100vh-140px)] transition-all duration-300 ease-out overflow-y-auto ${isOpen ? "bottom-0" : "-bottom-full"}`}
                    >
                        <div className="lg:flex lg:justify-between grid grid-rows-2 justify-center items-center mb-4 fixed lg:relative bg-white w-full lg:px-4 lg:py-2 rounded-t-3xl">
                        <button
                                type="button"
                                className="text-gray-300 hover:text-gray-700 lg:hidden flex justify-center"
                                onClick={() => setIsOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <GoHorizontalRule
                                    size={32}
                                className='text-center' />
                            </button>
                            <h3 className="text-lg font-bold text-gray-800">
                                <p>
                                    Filters
                                </p>
                                {/* <BiFilter
                                size={24} /> */}
                            </h3>
                            
                        </div>

                        <div className="space-y-4 border-gray-200 lg:border-none pt-20 lg:pt-0 lg:p-4">
                            {t[category].fields.map((field) => (
                                <div key={field.name} className="lg:bg-gray-50 p-3 lg:rounded-lg border-gray-200 border-t-[0.1rem] lg:border-none">
                                    <label className="block mb-2 font-medium text-gray-700 px-4">
                                        {field.name}
                                        {field.required && <span className="text-red-500 ml-1 px-4">*</span>}
                                    </label>

                                    {field.type && field.type === "range" && (
                                        <div className="space-y-2 px-4">
                                            <input
                                                id={field.name}
                                                type="range"
                                                {...register(field.name, { required: field.required })}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                min="0"
                                                max="1000000000"
                                                step="1"
                                                value={rangeValue}
                                                onChange={handleRangeChange}
                                            />
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>{formatValue(rangeValue)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {field.items && (
                                        <div className="space-y-2 px-4">
                                            {field.items.map((item) => (
                                                <label
                                                    key={item.name}
                                                    className="flex items-center space-x-3 cursor-pointer group"
                                                >
                                                    <div className="relative">
                                                        <input
                                                            type={item.type}
                                                            {...register(field.name, { required: field.required })}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-sm flex items-center justify-center peer-checked:bg-red-primary peer-checked:border-red-primary transition-colors group-hover:border-gray-400">
                                                            {item.type === 'checkbox' && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                            {item.type === 'radio' && (
                                                                <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-gray-700 group-hover:text-gray-900">{item.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex space-x-3 px-4">
                            <Button
                                title="Apply Filters"
                                type="submit"
                                className="flex-3 bg-red-primary hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                            />
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 items-center justify-center flex cursor-pointer border-gray-300 text-gray-700 rounded-md transition-colors duration-200"
                            >
                                <VscRefresh
                                    size={20} />
                            </button>
                        </div>
                    </form>

                    <div
                        className={`fixed inset-0 z-10 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        onClick={() => setIsOpen(false)}
                    />
                </>
            )}
        </>
    );
}