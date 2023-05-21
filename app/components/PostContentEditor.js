import { useRef, useImperativeHandle, forwardRef, memo } from 'react';
import JoditEditor from 'jodit-react';

const BUTTONS = ['bold', 'italic', 'underline', 'link', 'ul', 'eraser'];

const PostContentEditor = ({ setFormik, initValue, setTouch }) => {
    const editor = useRef(null);

    function handleChange(newContent) {
        setFormik(newContent);
    }

    function handleBlur(newContent) {
        // TODO: blur
        setTouch();
    }

    return (
        <JoditEditor
            ref={editor}
            value={initValue}
            key="contentEditor"
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
