'use client';

import { Dispatch, SetStateAction } from 'react';
import { FaBold } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaListOl } from "react-icons/fa6";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { LuHeading4 } from "react-icons/lu";
import { LuHeading5 } from "react-icons/lu";
import { LuHeading6 } from "react-icons/lu";
import { LuHeading1, LuImages } from "react-icons/lu";
import { useAppSelector } from '@/lib/states/hooks';
import { useEditor, EditorContent } from '@tiptap/react';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import Button from './Button';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import OrderedList from '@tiptap/extension-ordered-list';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import ImageResize from "tiptap-extension-resize-image";
import Placeholder from '@tiptap/extension-placeholder';

interface Form {
    name: string;
    description: string;
    category: string;
    price: string;
    score: string;
    image: string;
    features: {
        id: string;
        key: string;
        value: string;
    }[];
    detailContent: string;
}

interface Props {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
}

export default function Editor({
    form,
    setForm
}: Props) {
    const t = useAppSelector(state => state.dictionary.content?.components.adminForm);
    const editor = useEditor({
        extensions: [Document, Text, Paragraph, Bold, Italic, OrderedList, BulletList, ListItem, Link, Image, ImageResize,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: t?.details,
                emptyEditorClass: 'before:content-[attr(data-placeholder)] before:absolute before:pointer-events-none',
            })
        ],
        onUpdate: ({ editor }) => {
            setForm({
                ...form,
                detailContent: editor.getHTML(),
            });
        },
        editorProps: {
            attributes: {
                class: "min-h-[300px] p-5"
            }
        }
    });

    if (!editor || !t) return null;

    const imageHandler = () => {
        const image = prompt('لینک عکس را وارد کنید');
        if (image) {
            editor.chain().focus().setImage({ src: image }).run();
            setForm((prevForm) => ({
                ...prevForm,
                detailContent: editor.getHTML(),
            }));
        }
    };

    const linkHandler = () => {
        const isActive = editor.isActive('link');
        const url = isActive ? "" : prompt("Please enter a URL:");

        if (url !== null) {
            editor.chain().focus().toggleLink({ href: url }).run();
        }
    }

    const editorItems = [
        {
            icon: <FaBold size={18} />,
            isActive: editor.isActive('bold'),
            onClick: () => editor.chain().focus().toggleBold().run(),
        },
        {
            icon: <FaItalic size={18} />,
            isActive: editor.isActive('italic'),
            onClick: () => editor.chain().focus().toggleItalic().run(),
        },
        {
            icon: <FaLink size={18} />,
            isActive: editor.isActive('link'),
            onClick: linkHandler,
        },
        {
            icon: <LuHeading1 size={26} />,
            isActive: editor.isActive('heading', { level: 1 }),
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
            icon: <LuHeading2 size={26} />,
            isActive: editor.isActive('heading', { level: 2 }),
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
            icon: <LuHeading3 size={26} />,
            isActive: editor.isActive('heading', { level: 3 }),
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
            icon: <LuHeading4 size={26} />,
            isActive: editor.isActive('heading', { level: 4 }),
            onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        },
        {
            icon: <LuHeading5 size={26} />,
            isActive: editor.isActive('heading', { level: 5 }),
            onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        },
        {
            icon: <LuHeading6 size={26} />,
            isActive: editor.isActive('heading', { level: 6 }),
            onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        },
        {
            icon: <FaListOl size={19} />,
            isActive: editor.isActive('orderedList'),
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
            icon: <FaListUl size={19} />,
            isActive: editor.isActive('bulletList'),
            onClick: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
            icon: <LuImages size={18} />,
            isActive: editor.isActive('image'),
            onClick: imageHandler,
        }
    ];

    return (
        <div className="flex flex-col gap-4 editor-container">
            <div className="flex flex-wrap gap-1 xs:gap-2">
                {editorItems.map((item, index) => (
                    <Button
                        key={index}
                        icon={item.icon}
                        onClick={item.onClick}
                        className={`${item.isActive ? "bg-red-primary !text-white" : "border border-slate-400 text-slate-400"} w-8 h-8 rounded-md`}
                    />
                ))}
            </div>
            <EditorContent editor={editor} className="rounded-md min-h-40 border border-slate-400" />
        </div>
    );
};
