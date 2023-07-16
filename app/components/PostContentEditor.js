'use client';
import { useRef, useImperativeHandle, forwardRef, memo } from 'react';
// import JoditEditor from 'jodit-react';
import JoditClient from './JoiditClient';

const BUTTONS = ['paragraph', 'bold', 'italic', 'underline', 'link', 'ul', 'eraser'];

const PostContentEditor = ({ setFormik, initValue, setTouch, triggerReset }) => {
    const editor = useRef(null);

    function handleChange(newContent) {
        setFormik(newContent);
    }

    function handleBlur(newContent) {
        // TODO: blur
        setTouch();
    }

    console.log('initValue', initValue);

    return (
        <JoditClient
            ref={editor}
            value={initValue}
            key={triggerReset}
            config={{
                buttons: BUTTONS,
                buttonsMD: BUTTONS,
                buttonsSM: BUTTONS,
            }}
            tabIndex={1}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
};

export default memo(PostContentEditor);
