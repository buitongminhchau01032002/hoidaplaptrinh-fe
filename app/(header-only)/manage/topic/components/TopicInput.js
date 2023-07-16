'use client';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';

function TopicInput({ topic, onChange }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(topic.name);
    const showUpdateNoti = () => toast.success('Update successfully!');
    const showDeleteNoti = () => toast.success('Delete successfully!');
    const showErorrNoti = () => toast.error('Something went wrong!');
    const user = useSelector(userSelector);

    function updateTopic() {
        fetch(`${API}/topics/${topic._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    showErorrNoti();
                    return;
                }
                setEditing(false);
                showUpdateNoti();
                onChange();
            })
            .catch((err) => {
                console.log(err);
                showErorrNoti();
            });
    }

    function deleteTopic() {
        fetch(`http://localhost:8080/api/categories/${topic._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    showErorrNoti();
                    return;
                }
                onChange();
                showDeleteNoti();
            })
            .catch((err) => {
                console.log(err);
                showErorrNoti();
            });
    }

    return !editing ? (
        <div className="flex border-b py-2">
            <div className="flex-1">{topic.name}</div>
            <button
                onClick={() => setEditing(true)}
                className="flex h-7 items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10"
            >
                Edit
            </button>
            {/* <button
                onClick={() => deleteTopic()}
                className="ml-2 flex h-7 items-center justify-center rounded-md bg-red-500 px-3 text-sm font-medium text-white transition hover:bg-red-600"
            >
                Xoá
            </button> */}
        </div>
    ) : (
        <div className="flex items-center">
            <div className="mr-2 flex-1">
                <input
                    type="text"
                    className="text-input"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <button
                onClick={() => updateTopic()}
                className="flex h-7 items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10"
            >
                Update
            </button>
            <button
                onClick={() => setEditing(false)}
                className="ml-2 flex h-7 items-center justify-center rounded-md bg-red-500 px-3 text-sm font-medium text-white transition hover:bg-red-600"
            >
                Close
            </button>
        </div>
    );
}

export default TopicInput;
