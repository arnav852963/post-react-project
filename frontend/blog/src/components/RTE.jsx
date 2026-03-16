import {Controller} from "react-hook-form"
import {Editor} from "@tinymce/tinymce-react";

export const RTE = ({name , control , label , defaultValue=""   }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-2 ml-1 text-sm font-black uppercase tracking-wider text-black">
                    {label}
                </label>
            )}

            <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({field : {onChange}})=>(
                        <Editor
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image", "advlist", "autolink", "lists", "link", "image",
                                    "charmap", "preview", "anchor", "searchreplace", "visualblocks",
                                    "code", "fullscreen", "insertdatetime", "media", "table",
                                    "code", "help", "wordcount", "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",

                                content_style: `
                                    body { 
                                        font-family: 'Inter', Helvetica, Arial, sans-serif; 
                                        font-size: 16px; 
                                        line-height: 1.5; 
                                        background-color: #fff;
                                        color: #000;
                                    }
                                    b, strong { font-weight: 900; }
                                `,
                                skin: "oxide",
                                content_css: "default",
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}