'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';

export default function CommentVoteControl({ upVotes, downVotes, onDown, onUp }) {
    const user = useSelector(userSelector);
    const [_upVotes, setUpVotes] = useState(upVotes || []);
    const [_downVotes, setDownVotes] = useState(downVotes || []);
    const score = _upVotes.length - _downVotes.length;

    useEffect(() => {
        setUpVotes(upVotes);
    }, [upVotes]);

    useEffect(() => {
        setDownVotes(downVotes);
    }, [downVotes]);

    function handleUp() {
        onDown && onUp();
        if (_upVotes.includes(user._id)) {
            setUpVotes(_upVotes.filter((v) => v !== user._id));
            return;
        }
        setUpVotes([..._upVotes, user._id]);
        if (_downVotes.includes(user._id)) {
            setDownVotes(_downVotes.filter((v) => v !== user._id));
        }
    }
    function handleDown() {
        onUp && onDown();
        if (_downVotes.includes(user._id)) {
            setDownVotes(_downVotes.filter((v) => v !== user._id));
            return;
        }
        setDownVotes([..._downVotes, user._id]);
        if (_upVotes.includes(user._id)) {
            setUpVotes(_upVotes.filter((v) => v !== user._id));
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleUp}
                className={clsx('-rotate-90 text-gray-600', {
                    '!text-primary': user?._id && _upVotes.includes(user._id),
                })}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
            </button>

            <div className="text-lg font-semibold">{score}</div>

            <button
                onClick={handleDown}
                className={clsx('rotate-90 text-gray-600', {
                    '!text-primary': user?._id && _downVotes.includes(user._id),
                })}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
            </button>
        </div>
    );
}
