'use client';

import clsx from 'clsx';
import { useState } from 'react';

export default function TagsInput({ formik }) {
    const [inputValue, setInputValue] = useState('');
    function handleAddTag() {
        if (!inputValue) {
            return;
        }
        if (formik.values.tags?.includes(inputValue)) {
            return;
        }
        formik.setFieldValue('tags', [...formik.values.tags, inputValue]);
        setInputValue('');
    }

    function handleRemoveTag(tag) {
        formik.setFieldValue(
            'tags',
            formik.values.tags.filter((t) => t !== tag)
        );
    }

    return (
        <div>
            <div className="relative">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    name="tags"
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
                {formik.values.tags?.map((tag) => (
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
                    // '!visible text-red-500': formik.errors.tags && formik.touched.tags,
                })}
            >
                {formik.errors.tags || 'No error message'}
            </div>
        </div>
    );
}
