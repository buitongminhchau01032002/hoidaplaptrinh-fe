import { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';

function ImageInput({ formik, formikField, edit = true, initImage = [] }) {
    const [editing, setEditing] = useState(edit || initImage.length === 0);
    useEffect(() => {
        setEditing(edit || initImage.length === 0);
    }, [edit, initImage]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        formik.setFieldValue(formikField, imageList);
    };

    function handleDeletedAllClick() {
        setEditing(true);
        formik.setFieldValue(formikField, []);
    }

    return (
        <>
            {editing ? (
                <ImageUploading
                    multiple
                    value={formik.values[formikField] || []}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    acceptType={['jpg', 'png', 'gif']}
                >
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                        // write your building UI
                        <div className="flex flex-wrap">
                            {imageList.map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative mb-2 mr-2 h-28 w-28 overflow-hidden rounded"
                                >
                                    <img
                                        src={image.data_url}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center space-x-1 bg-black/50 text-white opacity-0 group-hover:opacity-100">
                                        <button
                                            type="button"
                                            className="rounded-full p-3 hover:bg-white/20"
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded-full p-3 hover:bg-white/20"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="mb-2 mr-2 flex h-28 w-28 flex-col items-center justify-center rounded border text-gray-600 hover:border-primary"
                                onClick={onImageUpload}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div className="mt-1">Add image</div>
                            </button>
                        </div>
                    )}
                </ImageUploading>
            ) : (
                <div className="flex flex-wrap">
                    {initImage.map((image, index) => (
                        <div key={index} className="mb-2 mr-2 h-28 w-28 overflow-hidden rounded">
                            <img src={image} alt="" className="h-full w-full object-cover" />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mb-2 mr-2 flex h-28 w-28 flex-col items-center justify-center rounded border text-gray-600 hover:border-primary"
                        onClick={handleDeletedAllClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <div className="mt-1">Delete Image</div>
                    </button>
                </div>
            )}
        </>
    );
}

export default ImageInput;
