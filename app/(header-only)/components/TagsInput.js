'use client';

import clsx from 'clsx';
import { useState } from 'react';

export default function TagsInput({ formik }) {
    const [inputValue, setInputValue] = useState('');
    function handleAddTag() {
        if (!inputValue) {
            return;
        }
        if (formik.values.tag_names?.includes(inputValue)) {
            return;
        }
        formik.setFieldValue('tag_names', [...formik.values.tag_names, inputValue]);
        setInputValue('');
    }

    function handleRemoveTag(tag) {
        formik.setFieldValue(
            'tag_names',
            formik.values.tag_names.filter((t) => t !== tag)
        );
    }

    console.log('tags: ', formik.values?.tag_names);

    return (
        <div>
            <div className="relative">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    name="tag_names"
                    type="text"
                    className="text-input"
                    placeholder="Add tags ..."
                />
                <button
                    className={clsx(
                        'absolute right-0 top-0 flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                        {
                            invisible: !inputValue,
                        }
                    )}
                    onClick={handleAddTag}
                    type="button"
                >
                    Add
                </button>
            </div>
            <div className="flex">
                {formik.values.tag_names?.map((tag) => (
                    <button
                        key={tag}
                        className="mr-1 mt-1 rounded border bg-white px-2 py-1 text-sm"
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div
                className={clsx('invisible text-sm', {
                    // '!visible text-red-500': formik.errors.tag_names && formik.touched.tag_names,
                })}
            >
                {formik.errors.tag_names || 'No error message'}
            </div>
        </div>
    );
}
