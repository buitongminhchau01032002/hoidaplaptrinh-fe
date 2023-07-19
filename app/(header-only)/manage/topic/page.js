'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';
import TopicInput from './components/TopicInput';

export default function ManageTopicPage() {
    const user = useSelector(userSelector);
    const [topicName, setTopicName] = useState('');
    // const [topicContent, setTopicContent] = useState('');

    const [modOfTopic, setModOfTopic] = useState({});

    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics();
    }, []);

    console.log(modOfTopic);

    useEffect(() => {
        if (topics.length === 0) {
            return;
        }

        const promiseMod = topics.map(async (topic) => {
            const resJson = await fetch(`${API}/users/mods?topicId=${topic?._id}`, {
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                },
            }).then((res) => res.json());
            if (resJson.error_key) {
                return [];
            }
            return resJson.data;
        });
        console.log(promiseMod);
        Promise.all(promiseMod).then((modss) => {
            const temp = {};
            console.log('modss', modss);
            modss.forEach((mods, index) => {
                temp[topics[index]._id] = mods;
            });
            setModOfTopic(temp);
        });
    }, [topics]);

    function getTopics() {
        fetch(`${API}/topics`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    setTopics([]);
                    return;
                }
                setTopics(resJson.data);
            })
            .catch((err) => {
                console.log(err);
                setTopics([]);
            });
    }

    function createTopic() {
        fetch(`${API}/topics`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: topicName }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    toast.error(resJson.message || 'Something went wrong');
                    return;
                }
                setTopicName('');
                toast.success('Created topic!');
                getTopics();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong');
            });
    }

    return (
        <div>
            <h2 className="mb-3 text-xl font-bold">Manage Topic</h2>

            <div className="mb-3 mt-2 flex items-center space-x-2">
                <input
                    type="text"
                    className="text-input flex-1"
                    onChange={(e) => setTopicName(e.target.value)}
                    value={topicName}
                    placeholder="Topic name"
                />
                {/* <input
                    type="text"
                    className="text-input flex-1"
                    onChange={(e) => setTopicContent(e.target.value)}
                    value={topicContent}
                    placeholder="Content"
                /> */}
                <button
                    onClick={() => createTopic()}
                    className="flex h-9 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                >
                    Create topic
                </button>
            </div>
            <div className="mt-3 space-y-3 bg-white p-3">
                {topics?.map((topic) => (
                    <TopicInput
                        modOfTopic={modOfTopic[topic?._id]}
                        topic={topic}
                        key={topic._id}
                        onChange={getTopics}
                    />
                ))}
            </div>
        </div>
    );
}
