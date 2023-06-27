import { useEffect, useRef, useState } from 'react';
import { API } from '~/constants';

function TopicInput({ ...props }) {
    const [topics, setTopics] = useState([]);
    const selectElem = useRef(null);

    useEffect(() => {
        fetch(`${API}/topics`)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    setTopics([]);
                    return;
                }
                setTopics(resJson.data);
            })
            .catch((error) => {
                console.log(error);
                setTopics([]);
            });
    }, []);

    return (
        <select {...props} ref={selectElem}>
            <option value="" disabled>
                -- Select topic --
            </option>
            {topics?.map((topic) => (
                <option key={topic._id} value={topic._id}>
                    {topic.name}
                </option>
            ))}
        </select>
    );
}
export default TopicInput;
